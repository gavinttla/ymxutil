

module.exports = {

    
    /**
     * this function get the 
     * 
     */
    getLivePage: function(option, done) {
        console.log('exec getLivePage');

        var objFs = require('fs');
        var objRequest = require('request');

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

        objRequest(requestOption, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                console.log(body);

                objFs.writeFile("temp/"+option.file, body, function(error) {
                    
                    if(error) {
                        console.log(error);
                    }

                    console.log("store success");
                });
            } else {
                console.log("send request fail"+error);
            }

        });

        
    },

    getCachePage: function(option, done) {
        console.log('exec getLivePage');
    }


};