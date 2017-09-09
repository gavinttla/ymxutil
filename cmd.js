
var objFs = require('fs');

function startParse() {

    console.log('here2');

    objFs.readFile('temp/ssd.html', 'utf8', function(err, data) {

        parseHtml(data);

    });

    'temp/ssd.html'
}


function parseHtml(strHtml) {

    console.log(strHtml);

}

console.log('here');

startParse();
