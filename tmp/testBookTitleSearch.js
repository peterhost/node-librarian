#!/usr/bin/node

require.paths.unshift(__dirname); //make local paths accessible -> node

//var process = require('process');
var colors = require('colors'); // colors are fun!
var books = require('bookTitleSearch');

    
books.text( process.argv[2], function(err, text){ // argv[2] is a JSON object { title: 'bob is cool', 'author: 'dean book', publisher: 'ouest france'}
  if(err){
    throw err;
  }
  console.log(text);
  
});