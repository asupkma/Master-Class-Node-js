/*
* Request handlers
*
*/

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');

// Define the handlers
var handlers = {};


// Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are filled out
  var firstName = typeof(data.payload.firstName)  == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName)  == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone)  == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password)  == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement)  == 'boolean' && data.payload.tosAgreement == true ? true : false;
  // console.log(firstName);
  // @TODO email and email validate
  // var email = typeof(data.payload.email)  == 'string' && data.payload.email.trim().length > 0 && emailValidator == true ? data.payload.email.trim() : false;

  if(firstName && lastName && phone && password && tosAgreement){
  // Make sure that the user doesnt already exist
  _data.read('users',phone,function(err,data){
    if(err){
      // Hash the password
      var hashedPassword = helpers.hash(password);

      // Create the user object
      if(hashedPassword){
        var userObject = {
          'firstName' : firstName,
          'lastName' : lastName,
          'phone' : phone,
          'hashedPassword' : hashedPassword,
          'tosAgreement' : true
        };

        // Store the user
        _data.create('users',phone,userObject,function(err){
          if(!err){
            callback(200);
          } else {
            console.log(err);
            callback(500,{'Error' : 'Could not create the new user'});
          }
        });
      } else {
        callback(500,{'Error' : 'Could not hash the user\'s password'});
      }
    } else {
      // User already exist
      callback(400,{'Error' : 'A user with that phone number already exist'});
    }
  });
  } else {
    callback(400,{'Error' : 'Missing required fields!'});
  }
};

// Users - get
// Required data: phone
// Optional data: none
// @TODO Only let an authenticated user access their object. Don't let them access anyone else's
handlers._users.get = function(data,callback){
//  console.log(data);
  // Check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Lookup the user
    _data.read('users',phone,function(err,data){
      if(!err && data){
        // Remove the hashed password from the user object before returning it to the requestor
        delete data.hashedPassword;
        callback(200,data);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Users - put
// Required data : phone
// optional data : firstName, lastName, password (at least one must be scecified)
// @TODO Only let an authenticated user update their own object. Don't let them update anyone else's
handlers._users.put = function(data,callback){
  // Check for the required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for the optional fields
  var firstName = typeof(data.payload.firstName)  == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName)  == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password)  == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if phone is invalid
  if(phone){
    // Error if nothing is sent to update
    if(firstName || lastName || password){
      // Lookup the user
      _data.read('users',phone,function(err,userData){
        if(!err && userData){
          // Update the fields if necessary
          if(firstName){
            userData.firstName = firstName;
          }
          if(lastName){
            userData.lastName = lastName;
          }
          if(password){
            userData.hashedPassword = helpers.hash(password);
          }
          // Store the new updates
          _data.update('users',phone,userData,function(err){
            if(!err){
              callback(200);
            } else {
              console.log(err);
              callback(500,{'Error' : 'Could not update the user.'});
            }
          });
        } else {
          callback(400,{'Error' : 'Specified user does not exist.'});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }

};

// Users - delete
// Required field : phone
// @TODO Only let an authenticated user delete their object. Dont let them delete anyone else's
// @TODO Cleanup (delete) any other data files associated with this user
handlers._users.delete = function(data,callback){
  // Check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Lookup the user
    _data.read('users',phone,function(err,data){
      if(!err && data){
        _data.delete('users',phone,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified user'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified user'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};


// Tokens
handlers.tokens = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methods
handlers._tokens = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback){
  var phone = typeof(data.payload.phone)  == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password)  == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(phone && password){
    // Lookup the user who matches that phone number
    _data.read('users',phone,function(err,userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name. Set an expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };

          // Store the token
          _data.create('tokens',tokenId,tokenObject,function(err){
            if(!err){
              callback(200,tokenObject);
            } else {
              callback(500,{'Error' : 'Could not create the new token'});
            }
          });
        } else {
          callback(400,{'Error' : 'Password did not mach the specified user\'s stored password'});
        }
      } else {
        callback(400,{'Error' : 'Could not find the specified user'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field(s)'});
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback){
  // Check that Id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,tokenData){
      if(!err && tokenData){
        callback(200,tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};


// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback){
var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
if(id && extend){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check to the make sure the token isn't already expired
      if(tokenData.expires > Date.now()){
        // Set the expiration an hour from now
        tokenData.expires = Date.now() + 1000 * 60 * 60;
        // Store the new updates
        _data.update('tokens',id,tokenData,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not update the token\'s expiration'});
          }
        });
      } else {
        callback(400,{'Error' : 'The token has already epired, and cannot be extended'});
      }
    } else {
      callback(400,{'Error' : 'Specified token does not exist'});
    }
  });
} else {
  callback(400,{'Error' : 'Missing required field(s) or field(s) invalid'});
}
};

// Tokens - delete
handlers._tokens.delete = function(data,callback){

};

// Sample handler
handlers.sample = function(data,callback){
  // Callback a http status code, and a payload object
  callback(406,{'name' : 'sample handler'});
};

// Ping handler
handlers.ping = function(data,callback){
  callback(200);
};

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
};

// Export the module
module.exports = handlers;


/*
 @TODO email validator
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}
*/