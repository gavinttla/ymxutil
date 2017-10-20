var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var FileCookieStore = require('tough-cookie-filestore');

//console.log(option.url);
var j = request.jar(new FileCookieStore('cookie.json'));
request = request.defaults({jar:j});


var PageUtil = new function() {

    this.headers = {
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
                'HTTP_ACCEPT':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'HTTP_ACCEPT_LANGUAGE':'en-US,en;q=0.5',
                'HTTP_ACCEPT_ENCODING':'gzip, deflate'
                };

    var self = this;

    this.keyword = '';

    this.baseurl = '';

    this.curUrl = '';

    /**
     * option = {
     *      'keyword':'',
     *      'baseurl':'',
     *      'isOverWrite':true/false
     * 
     * }
     * 
     */
    this.init = function(option) {
        if(option.isOverWrite){
            this.keyword = option.keyword;
            this.baseurl = option.url;
        }

        this.getLivePage(this.baseurl);
    };

    this.getLivePage = function(newurl) {

        var requestOption = {
            url: newurl,
            headers: this.headers
        };

        console.log(newurl);

        request(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var pageResult = self.checkPage(body, requestOption.url);

                // if next page exist
                if(pageResult.nextPageUrl) {
                    
                    var nexturl = 'https://www.amazon.com'+pageResult.nextPageUrl;

                    setTimeout(function() {

                        self.getLivePage(nexturl);

                    }, 2000);

                }

            } else {
                console.log("send request fail:"+response);
            }

        });

    };


    this.checkPage = function(html, url) {
        var isKeyExist = this.isKeywordExist(html);

        var nextPageUrl = this.getNextPageLink(html, url);

        return {isKeyExist: isKeyExist, nextPageUrl: nextPageUrl};
    };


    this.isKeywordExist = function(html) {
        var re = "/" + this.keyword + "/i";
        return html.match(re);
    };

    this.getNextPageLink = function(html, url) {
        //console.log('getnextpagelink:'+url);
        var newurl, tempnum, addnum, tempurl, finalurl;
        var curPageNum = this.getPageNum(url);
        if(!curPageNum){
            curPageNum = 1;
        }
        var $ = cheerio.load(html);

        $(".pagnLink a").each(function(){
            tempurl = $(this).attr('href');
            //console.log(tempurl);
            tempnum = self.getPageNum(tempurl);
            addnum = parseInt(curPageNum) + 1;
            if(addnum == parseInt(tempnum)){
                finalurl = tempurl;
            } 
        });

        return finalurl;

    };


    this.getPageNum = function(url) {
        var re = /page=(\d+)/i;
        var found = url.match(re);

        if(found){
            return found[1];
        }else{
            return false;
        }
    };


};


module.exports = {


    getPage: function(option, done) {

        PageUtil.init(option);

    },
    

    /**
     * this function get the 
     * 
     */
    getLivePage: function(option, done) {
        console.log('exec getLivePage');

        if(!option.url || !option.file) {
            return false;
        }

        var requestOption = {
            url: option.url,
            headers: {
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
                'HTTP_ACCEPT':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'HTTP_ACCEPT_LANGUAGE':'en-US,en;q=0.5',
                'HTTP_ACCEPT_ENCODING':'gzip, deflate'
            }
        };

        console.log(option.url);

        request(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var pageResult = PageService.checkPage(body, requestOption.url);

                // if next page exist
                if(pageResult.nextPageUrl) {

                    setTimeout(function() {

                        PageService.getPageByUrl(pageResult.nextPageUrl);

                    }, 2000);

                }

            } else {
                console.log("send request fail:"+response);
            }

        });

        
    },

    getPageByUrl: function(url) {

        var newurl = 'https://www.amazon.com'+url;
        var curPageNum = PageService.getPageNum(url);

        console.log('getPageByUrl:'+newurl);

        var requestOption = {
            url: newurl,
            headers: {
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
                'HTTP_ACCEPT':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'HTTP_ACCEPT_LANGUAGE':'en-US,en;q=0.5',
                'HTTP_ACCEPT_ENCODING':'gzip, deflate'
            },
            jar: true
        };

        console.log('processing url:'+newurl);

        request(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log('start with second pull');
                var pageResult = PageService.checkPage(body, newurl);;

                // if next page exist
                if(pageResult.nextPageUrl) {
                    setTimeout(function(){
                        
                        PageService.getPageByUrl(pageResult.nextPageUrl);
                    
                    }, 2000);

                }

            } else {
                console.log("send request fail"+error);
            }

        });


    },

    

    checkPage: function(html, url) {

        var isKeyExist = this.isKeywordExist(html);

        var nextPageUrl = this.getNextPageLink(html, url);

        return {isKeyExist: isKeyExist, nextPageUrl: nextPageUrl};
    },


    isKeywordExist: function(html, keyword) {



    },


    /**
     * load with cheerio and get the first pagination link
     */
    getNextPageLink: function(html, url) {
        //console.log('getnextpagelink:'+url);
        var newurl, tempnum, addnum, tempurl, finalurl;
        var curPageNum = PageService.getPageNum(url);
        if(!curPageNum){
            curPageNum = 1;
        }
        var $ = cheerio.load(html);

        $(".pagnLink a").each(function(){
            tempurl = $(this).attr('href');
            //console.log(tempurl);
            tempnum = PageService.getPageNum(tempurl);
            addnum = parseInt(curPageNum) + 1;
            if(addnum == parseInt(tempnum)){
                finalurl = tempurl;
            } 
        });

        return finalurl;
    },

    /**
     * check the current page number
     */
    getPageNum: function(pageUrl) {
        var re = /page=(\d+)/i;
        var found = pageUrl.match(re);

        if(found){
            return found[1];
        }else{
            return false;
        }
    }



}


/*
var pageUtil = new function() {

    this.vars = {};




}
*/


