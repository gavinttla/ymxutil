/**
 * ListingController
 *
 * @description :: Server-side logic for managing listings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


dosearch: function (req, res) {

  console.log('here');

  var html = getFileHtml();

  return res.json({
      val: html
    });

},



  /**
   * `ListingController.dosearch()`
   */
  dosearchbak: function (req, res) {
    console.log(req.body.url);

    // var objHttps = require('https');
    var objRequest = require('request');
    var objFs = require('fs');

    objRequest(req.body.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        
        
        console.log(body);

        objFs.writeFile("ssd.html", body, function(error) {
          if(error) {
            console.log(error);
          }

          console.log("store success");

        });

      }




    });




    /*
    var host = 'www.amazon.com';
    var 

    var options = {
      host: 'www.amazon.com'
    }
    */

    // req.body { url: 'https://www.amazon.com', keyword: 'lunch box' }
    console.log(req.body.url);


    return res.json({
      todo: 'dosearch() is not implemented yet!',
      body: 'body'

      

    });
  },

  getFileHtml: function () {
    var objFs = require('fs');
    var gdata;
    objFs.readFile('temp/ssd.html', 'utf8', function(err, data) {
      gdata = data;
    });

    console.log(gdata);

    return gdata;
  }


};

