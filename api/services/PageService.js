var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var FileCookieStore = require('tough-cookie-filestore');

//console.log(option.url);
var j = request.jar(new FileCookieStore('cookie.json'));
request = request.defaults({jar:j});


module.exports = {

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

                var pageResult = PageService.checkPage(body, requ);

                // if next page exist
                if(pageResult.nextPageUrl) {

                    setTimeout(function() {

                        PageService.getPageByUrl(pageResult.nextPageUrl);

                    }, 2000);

                }




                /*
                console.log(body);

                fs.writeFile("temp/"+option.file, body, function(error) {
                    
                    if(error) {
                        console.log(error);
                    }

                    console.log("store success");
                });
                */
                //checkPage.done
            } else {
                console.log("send request fail:"+response);
            }

        });

        
    },


    checkPage: function(html, url) {

        var isKeyExist = this.isKeywordExist(html);

        var nextPageUrl = this.getNextPageLink(html);

        return {isKeyExist: isKeyExist, nextPageUrl: nextPageUrl};
    },


    getPageByUrl: function(url) {

        var newurl = 'https://www.amazon.com'+url;
        var curPageNum = PageService.getPageNum(url);

        console.log('getPageByUrl:'+newurl);

        var requestOption = {
            url: newurl,
            headers: {
                'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5'
            },
            jar: true
        };

        console.log('processing url:'+newurl);

        request(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var pageResult = PageService.checkPage(body, url);;

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

    isKeywordExist: function(html, keyword) {



    },


    /**
     * load with cheerio and get the first pagination link
     */
    getNextPageLink: function(html, url) {
        var newurl, tempnum, addnum, tempurl, curPageNum = PageService.getPageNum(url);
        var $ = cheerio.load(html);

        $(".pagnLink a").each(function(){
            tempurl = $(this).attr('href');
            tempnum = PageService.getPageNum(tempurl);
            addnum = tempnum + 1;
            if(addnum == curPageNum){
                return tempurl;
            } else {
                tempurl = '';
            }
        });

        return false;
    },

    /**
     * check the current page number
     */
    getPageNum: function(pageUrl) {
        var re = /page=(\d+)/i;
        var found = $url.match(re);

        if(found){
            return found[1];
        }else{
            return false;
        }
    }



};