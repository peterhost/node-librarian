#!/usr/local/bin/node

/* REFERENCE : http://lessthanme.com/archives/2011/01/finished.html
 * SOURCE : http://lessthanme.com/archives/files/book.js     
 *       
*/
var http = require('http');
var fs = require('fs');

var YEAR = "2011";
var title = process.argv[2].replace(/\s/gi, "+");
var googlePath = '/ajax/services/search/books?v=1.0&q=intitle:"' + title + '"';
var googleClient = http.createClient(443, 'ajax.googleapis.com', true);
var isbnRequest = googleClient.request('GET', googlePath, {'host': 'ajax.googleapis.com'});
isbnRequest.end();
isbnRequest.on('response', function (isbnResponse) {
    isbnResponse.setEncoding('utf8');
    var isbnResponseText = "";
    isbnResponse.on('data', function (chunk) {
        isbnResponseText += chunk;
    }).on('end', function() {
        var isbnResponseObj = JSON.parse(isbnResponseText);
        var isbn = isbnResponseObj.responseData.results[0].bookId.substr(4);
        var imgPath = "/index.aspx?isbn=" + isbn + "/MC.JPG";
        var imgClient = http.createClient(80, 'www.syndetics.com');
        var imgRequest = imgClient.request('GET', imgPath, {'host': 'www.syndetics.com'});
        imgRequest.end();
        imgRequest.on('response', function(imgResponse) {
            var imgFile = fs.createWriteStream("~/lessthanme.com/archives/images/currents/" + YEAR + "/" + isbn + ".jpg");
            imgResponse.on('data', function(imgChunk) {
                imgFile.write(imgChunk);
            }).on('end', function() {
                imgFile.end();
                var imgTag = '<img src="http://lessthanme.com/archives/images/currents/' + YEAR + '/' + isbn + '.jpg">';
                console.log('<a href="http://amzn.com/' + isbn + '">' + imgTag + '</a>');
            });
        });
    });
});
