
var objFs = require('fs');
var parse5 = require('parse5');
var cheerio = require('cheerio');
var request = require('request');
var FileCookieStore = require('tough-cookie-filestore');


function mycurl() {

    var requestOption = {
        url: 'http://www.gtcampus.com/gavin/server.php',
        headers: {
            'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0',
            'HTTP_ACCEPT':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'HTTP_ACCEPT_LANGUAGE':'en-US,en;q=0.5',
            'HTTP_ACCEPT_ENCODING':'gzip, deflate'
        },
    };

    //console.log(option.url);
    var j = request.jar(new FileCookieStore('cookie.json'));
    request = request.defaults({jar:j});

    request(requestOption, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(body);

        } else {
            console.log("send request fail:"+response);
        }

    });

}


function startParse() {

    console.log('here2');

    objFs.readFile('temp/cellphone_case.html', 'utf8', function(err, data) {

        var $ = cheerio.load(data);

        //console.log($(".pagnLink a").attr('href'));

        $(".pagnLink a").each(function(){
            console.log($(this).attr('href'));
        });


        var pageurl = $(".pagnLink a");

        //console.log(pageurl.length);
        //console.log(pageurl[1]);

        var pagenum = getPageNum($(".pagnLink a").attr('href'));

        parseHtml(data);

    });

    //'temp/ssd.html'
}

function getPageNum($url) {

    var re = /page=(\d+)/i;
    var found = $url.match(re);

    if(found){
        return found[1];
    }else{
        return false;
    }
}

function parseHtml(strHtml) {

    //console.log(strHtml);
    console.log('parseHtml');

}

console.log('here');

startParse();

//mycurl();
