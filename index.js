//console.log("Hello World!");
/*
* Primary file for the API
*
*/
// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./lib/config');
var fs = require('fs');
var _data = require('./lib/data');
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');
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
var httpServer = http.createServer(function(req,res){
  unifiedServer(req,res);
});

// Start the HTTP server, and port from the config
httpServer.listen(config.httpPort,function(){
  console.log("The server is listening on port "+config.httpPort+" in "+config.envName+" mode");
});

// Instantiate the HTTPS server
var httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions,function(req,res){
  unifiedServer(req,res);
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort,function(){
  console.log("The server is listening on port "+config.httpsPort+" in "+config.envName+" mode");
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
var unifiedServer = function(req,res){
  /*
    res.end('Hello World!\n');
    console.log("Url: " + req.url);
    console.log("User-Agent: " + req.headers["user-agent"]);
    console.log("Тип запроса: " + req.method);
    console.log("Все заголовки");
    console.log(req.headers);
  */

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

    //Choose the handler this request should go to. If one is not found, use the notFound handler
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    };
    //console.log(data);

    // Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload){
      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log("Returning this response: ",statusCode,payloadString);

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
var router = {
  'sample' : handlers.sample,
  'ping' : handlers.ping,
  'users' : handlers.users,
  'tokens' : handlers.tokens
};
