// Based on : translate
// By : Andrew Lunny and Marak Squires
//      Mit yo, copy paste us some credit


var getBookSearchPath = function (args) {

  var searches = {
    title:      'intitle:',
    author:     'inauthor:', 
    publisher:  'inpublisher:',
  };
  
  var key;
  var queryList;
  var queryString = '&q=';
  var i;
  
  for (key in searches) {
    if (searches.hasOwnProperty(key)) {
      if (args[key]) {
        //split args with spaces
        queryList = args[key].split(/\s+/);
        for (i = 0; i < queryList.length; i++) {
          queryString +=  searches[key] + encodeURIComponent( queryList[i] + ' ') ;
        }
      }
    }
  }
  return '/ajax/services/search/books?v=1.0' +
    //encodeURIComponent(queryString);
    queryString;
};





var sys     = require('sys');
var http    = require('http');
var request = require('request');
var books   = exports;


exports.text = function (args, callback) {
  var dataIn;
  var dataOut;
  var requestOptions;
  try {
    dataIn = JSON.parse(args);
  }
  catch(e) {
    return callback(e);
  }
  
  
  requestOptions = {
        uri: 'http://ajax.googleapis.com' + getBookSearchPath(dataIn)
      };
  
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
    if (!dataOut || !dataOut.responseData || dataOut.responseStatus != 200) {
      return callback(new Error(dataOut && dataOut.responseDetails ? dataOut.responseDetails : 'No response data'));
    }

    callback(null, dataOut.responseData.results);
  });
};
