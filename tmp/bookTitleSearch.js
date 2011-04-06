// Based on : translate
// By : Andrew Lunny and Marak Squires
//      Mit yo, copy paste us some credit


var getBookSearchPath = function (args, text) {

  var searches = {
    title:    '&q=intitle:',
    author:   '&q=inauthor:', 
    publisher:  '&q=inpublisher:',
  };
  var key;
  
  for (key in searches) {
    if (searches.hasOwnProperty(key)) {
      console.log('key : ' + key);
      if (args[key]) {
        console.log ("YES");
      }
    }
  }
  console.log(args);
  return '/ajax/services/search/books?v=1.0' +
    'REMOVEME!!!' + encodeURIComponent(text);
};


var sys     = require('sys');
var http    = require('http');
var request = require('request');
var books   = exports;



// get Books Search results (TITLES)
exports.text = function (type, text, callback) {
  var data;
  var requestOptions = {
        uri: 'http://ajax.googleapis.com' + getBookSearchPath(type, text)
      };
  
  console.log(requestOptions);
  request(requestOptions, function(err, resp, body){
    if(err){
      return callback(err);
    }
    try {
      data = JSON.parse(body);
    }
    catch(e) {
      return callback(e);
    }
    if (!data || !data.responseData || data.responseStatus != 200) {
        return callback(new Error(data && data.responseDetails ? data.responseDetails : 'No response data'));
    }

    callback(null, data.responseData.results);
  });
};




exports.text2 = function (args, callback) {
  var dataIn;
  var dataOut;
  var requestOptions;
  dataIn = JSON.parse(args);
  console.log(dataIn);
  exit
  
  requestOptions = {
        uri: 'http://ajax.googleapis.com' + getBookSearchPath(dataIn)
      };
  
  console.log(requestOptions);
  request(requestOptions, function(err, resp, body){
    if(err){
      return callback(err);
    }
    try {
      dataOut = JSON.parse(body);
    }
    catch(e) {
      return callback(e);
    }
    if (!dataOut || !dataOut.responsedataOut || dataOut.responseStatus != 200) {
        return callback(new Error(dataOut && dataOut.responseDetails ? dataOut.responseDetails : 'No response data'));
    }

    callback(null, dataOut.responseData.results);
  });
};
