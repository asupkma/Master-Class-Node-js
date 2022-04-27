/*
* The server start module
*
*/

var http = require('http');
var config = require('./config');

function start() {
  server.listen(config.port,function(){
    console.log("The server is listening on port "+config.port+" in "+config.envName+" mode");
  });
};

exports.start = start;