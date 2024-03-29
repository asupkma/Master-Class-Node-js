/*
* Helpers for various tasks
*
*/

// Dependencies
var crypto = require('crypto');
var config = require('./config');
var querystring = require('querystring');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');

// Container for all the helpers
var helpers = {};

// Create a SHA256 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    var hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing
//console.log('STR '+str);
helpers.parseJsonToObject = function(str){
//  console.log(JSON.parse(str));
  try{
    var obj = JSON.parse(str);
    return obj;
  }catch(e){
    return {};
  }
};

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    // Define all the possible characters that could go into a string
    var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    // Start the final string
    var str = '';
    for(i = 1; i <= strLength; i++){
      // Get a random character from the possibleCharacters string
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the final string
      str+=randomCharacter;

    }
    //var str ='';
    //var str = crypto.randomBytes(5).toString('hex');
    //str+=str;
    // Return the final string
    return str;
  } else {
    return false;
  }
};

// Send an SMS message via Twilio
helpers.sendTwilioSms = function(phone,msg,callback){
  // Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg){
    // Configure the request payload
    var payload = {
      'From' : 'whatsapp:'+config.twilio.fromPhone,
      'To' : 'whatsapp:+7'+phone,
      'Body' : msg
    };

    // Stringify the payload
    var stringPayload = querystring.stringify(payload);

    // Configure the request details
    var requestDetails = {
      'method' : 'POST',
//      'protocol' : 'https:',
      'hostname' : 'api.twilio.com',
      'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
      'headers' : {
        'content-Type' : 'application/x-www-form-urlencoded'
  //      'Content-Length' : Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
      // Grab the status of the sent request
      var status = res.statusCode;
      // Callback successfully if the request went through
      if(status == 200 || status == 201){
        callback(false);
      } else {
        callback('Status code returned was '+status);
      }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();


  } else {
    callback('Given parameters were missing or invalid');
  }
};

// Send to Telegram
//helpers.sendTwilioSms = function(phone,msg,callback){
helpers.sendToTelegram = function(phone,msg,callback){
  var https = require('https');
  // Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg){
    // Configure the request payload
/*    var payload = {
      'From' : 'whatsapp:'+config.twilio.fromPhone,
      'To' : 'whatsapp:+7'+phone,
      'Body' : msg
    };
*/
    var requestDetails = {
      'method' : 'POST',
//      'protocol' : 'https:',
//      'hostname' : 'api.twilio.com',
      'hostname' : 'api.telegram.org',
//      'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
      'path' : '/bot'+config.telegram.botId+':'+config.telegram.botSid+'/sendMessage',
//      'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
      'headers' : {
  //      'content-Type' : 'application/x-www-form-urlencoded'
  //      'Content-Length' : Buffer.byteLength(stringPayload)
      'content-Type' : 'application/x-www-form-urlencoded'
    },
    'maxRedirects': 20
    };

  var jsonPayload = JSON.stringify({
    chat_id : config.telegram.chatId,  // TODO: Specify the group name here.
    text : phone,  // TODO: Specify the number of the group admin here.
    disable_notification : true
});

var data = {
  'chat_id' : config.telegram.chatId,
  'text' : phone+' - '+msg,
  'disable_notification' : 'true'
};

var stringPayload = querystring.stringify(data);
//console.log(stringPayload);

var req = https.request(requestDetails, function (res) {
  var chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    //console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});



req.write(stringPayload);

req.end();


    // Stringify the payload
//    var stringPayload = querystring.stringify(payload);

/*    // Instantiate the request object
    var req = https.request(requestDetails,function(res){
      // Grab the status of the sent request
//      var status = res.statusCode;
      // Callback successfully if the request went through
//      if(status == 200 || status == 201){
       callback(false);
//      } else {
//        callback('Status code returned was '+status);
//        console.log(status);
//      }
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
      callback(e);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();


  } else {
    callback('Given parameters were missing or invalid');
  }
  */
callback(false);
};

};

// Get the string content of a template
helpers.getTemplate = function(templateName,data,callback){
  templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
  data = typeof(data) == 'object' && data !== null ? data : {};
  if(templateName){
    var templatesDir = path.join(__dirname,'/../templates/');
    fs.readFile(templatesDir+templateName+'.html','utf8',function(err,str){
      if(!err && str && str.length > 0){
        // Do interpolation on the string
        var finalString = helpers.interpolate(str,data);
        callback(false,finalString);
      } else {
        callback('No template could be found');
      }
    });
  } else {
    callback('A valid template name was not specified');
  }
};

// Add the universal header and footer to a string, and pass provided data object to header and footer for interpolation
helpers.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
  // Get the header
  helpers.getTemplate('_header',data,function(err,headerString){
    if(!err &&headerString){
      // Get the footer
      helpers.getTemplate('_footer',data,function(err,footerString){
        if(!err && footerString){
          // Add them all together
          var fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};

// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = function(str,data){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};

  // Add the templateGlobals to the data object, prepending their key name with "global."
  for(var keyName in config.templateGlobals){
    if(config.templateGlobals.hasOwnProperty(keyName)){
      data['global.'+keyName] = config.templateGlobals[keyName];
//      console.log(keyName);
    }
  }

  // For each key in the data object, insert its value into the string at the corresponding placeholder
  for(var key in data){
    if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
      var replace = data[key];
      var find = '{'+key+'}';
      str = str.replace(find,replace);
    }
  }

  return str;


};

// Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName,function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not specified');
  }
};






// Export the module
module.exports = helpers;
