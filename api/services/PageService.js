var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


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
                'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5'
            },
            jar: true
        };

        request(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                var pageResult = this.checkPage(body);
                /*
                console.log(body);

                fs.writeFile("temp/"+option.file, body, function(error) {
                    
                    if(error) {
                        console.log(error);
                    }

                    console.log("store success");
                });
                */
            } else {
                console.log("send request fail"+error);
            }

        });

        
    },


    checkPage: function(html) {

        var isKeyExist = this.isKeywordExist(html);

        var nextPageUrl = this.getNextPageLink(html);

        return {isKeyExist: isKeyExist, nextPageUrl: nextPageUrl};
    },


    getPageByUrl: function(url) {

        var requestOption = {
            url: 'https://www.amazon.com'+url,
            headers: {
                'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5'
            },
            jar: true
        };


        request(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {

            } else {
                console.log("send request fail"+error);
            }

        });


    },

    isKeywordExist: function(html) {



    },


    /**
     * load with cheerio and get the first pagination link
     */
    getNextPageLink: function(html) {
        var $ = cheerio.load(html);
        return $(".pagnLink a").attr('href');
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
    },

    getCachePage: function(option, done) {
        console.log('exec getLivePage');
    }


};