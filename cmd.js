
var objFs = require('fs');
var parse5 = require('parse5');
var cheerio = require('cheerio');

function startParse() {

    console.log('here2');

    objFs.readFile('temp/ssd.html', 'utf8', function(err, data) {

        var $ = cheerio.load(data);

        console.log($(".pagnLink a").attr('href'));

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
