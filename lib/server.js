/*
* Server-related tasks
*
*/

// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var _data = require('./data');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');
var querystring = require('querystring');
var util = require('util');
var debug = util.debuglog('server');

// Instantiate the server module object
var server = {};

 //@TODO GET RID OF THIS
//helpers.sendTwilioSms('9527275728','Чо за жопа то?!',function(err){
//helpers.sendTwilioSms('7072065149','Чо за жопа то?!',function(err){
//  console.log('this was the error ',err);
//});

//var server = require('./server');

// TEST
//TESTING
// @TODO delete this
//_data.create('test','newFile',{'foo' : 'bar'},function(err){
//  console.log('this was the error',err);
//});

//_data.read('test','newFile1',function(err,data){
//  console.log('this was the error ',err, 'and this was the data ',data);
//});

//_data.update('test','newFile',{'fizz asdfasdf'      :     'buzz'},function(err){
//  console.log('this was the error ',err);
//});

//_data.delete('test','newFile',function(err){
//  console.log('this was the error ',err);
//});

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req,res){
  server.unifiedServer(req,res);
});



// Instantiate the HTTPS server
server.httpsServerOptions = {
  'key' : fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  'cert' : fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,function(req,res){
  server.unifiedServer(req,res);
});




// Send the response
/*res.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
res.write("<h2>Привет малыш!</h2>");
res.end();
//res.end('Hello World!\n');

// Log the request path
/*
console.log('Request received on path: '+trimmedPath+' with method: '+method+' and with these query string parameters ',queryStringObject);
console.log('Request received with these headers: ',headers);
console.log('Request received with this payload: ',buffer);
*/


//server.start();

// All the server logic for both the http and https server
server.unifiedServer = function(req,res){
  /*
    res.end('Hello World!\n');
    console.log("Url: " + req.url);
    console.log("User-Agent: " + req.headers["user-agent"]);
    console.log("Тип запроса: " + req.method);
    console.log("Все заголовки");
    console.log(req.headers);
  */

// console.log(req);
  // Get the URL and parse it
  var parsedUrl = url.parse(req.url,true);
//console.log(req.url);
  // Get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the query string as an object
  var queryStringObject = JSON.parse(JSON.stringify(parsedUrl.query));
//var queryStringObject = parsedUrl.query;

//console.log(queryStringObject);
  // Get the HTTP method
  var method = req.method.toLowerCase();

  // Get the headers as an object
  var headers = req.headers;

  // Get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data',function(data){
    buffer += decoder.write(data);
  });

  req.on('end',function(){
    buffer += decoder.end();
    //console.log(querystring.decode(buffer));
    body = querystring.decode(buffer);

    //Choose the handler this request should go to. If one is not found, use the notFound handler
    var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // If the request is within the public directory, use the public handler instead
    chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;


    // Construct the data object to send to the handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer),
      //'payloadJson' : querystring.decode(buffer)
      'payloadJson' : JSON.stringify(body, null, 2)
    };
    //console.log(data);

    // Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload,contentType){

      // Determine the type of response (fallback to json)
      contentType = typeof(contentType) == 'string' ? contentType : 'json';

      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object


      // Convert the payload to a string
      // var payloadString = JSON.stringify(payload);



      // Return the response-parts that are content-specific
      var payloadString = '';
      if(contentType == 'json'){
        res.setHeader('Content-Type','application/json');
        payload = typeof(payload) == 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      }
      if(contentType == 'html'){
        res.setHeader('Content-Type','text/html');
        payloadString = typeof(payload) == 'string' ? payload : '';
      }

      if(contentType == 'favicon'){
        res.setHeader('Content-Type','image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      if(contentType == 'css'){
        res.setHeader('Content-Type','text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      if(contentType == 'png'){
        res.setHeader('Content-Type','image/png');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      if(contentType == 'jpg'){
        res.setHeader('Content-Type','image/jpeg');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      if(contentType == 'plain'){
        res.setHeader('Content-Type','text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      // Return the response-parts that a common to all content-types


      res.writeHead(statusCode);
      res.end(payloadString);
      //console.log("Returning this response: ",statusCode,payloadString,data);

      // If the response is 200, print green otherwise print red
      if(statusCode == 200){
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }

    });

    /* Send the response
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
    res.write("<h2>Привет малыш!</h2>");
    res.end();
    // Log the request path
    console.log('Request received with this payload: ',buffer);
    console.log('Request received with these headers: ',headers);
  */
  });
};

// Define a request router
server.router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit' : handlers.accountEdit,
  'account/deleted' : handlers.accountDeleted,
  'session/create' : handlers.sessionCreate,
  'session/deleted' : handlers.sessionDeleted,
  'checks/all' : handlers.checkList,
  'checks/create' : handlers.checksCreate,
  'checks/edit' : handlers.checksEdit,
  'sample' : handlers.sample,
  'ping' : handlers.ping,
  'api/users' : handlers.users,
  'api/tokens' : handlers.tokens,
  'api/checks' : handlers.checks,
  'api/twilio' : handlers.twilio,
  'favicon.ico' : handlers.favicon,
  'public' : handlers.public
};

// Init script
server.init = function(){
  // Start the HTTP server, and port from the config
  server.httpServer.listen(config.httpPort,function(){
    console.log('\x1b[36m%s\x1b[0m',"The server is listening on HTTP  port "+config.httpPort+" in "+config.envName+" mode");
    //console.log("The server is listening on port "+config.httpPort+" in "+config.envName+" mode");
  });

  // Start the HTTPS server
  server.httpsServer.listen(config.httpsPort,function(){
    console.log('\x1b[35m%s\x1b[0m',"The server is listening on HTTPS port "+config.httpsPort+" in "+config.envName+" mode");
//    console.log("The server is listening on port "+config.httpsPort+" in "+config.envName+" mode");
  });
};

// Export server
module.exports = server;
