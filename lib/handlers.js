/*
* Request handlers
*
*/
//calling process.exit();
// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var human = require('./humanized');
var slack = require('./slack');
// Define the handlers
var handlers = {};

//console.log(config.slackURL);

//const yourWebHookURL = 'https://hooks.slack.com/services/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'; // PUT YOUR WEBHOOK URL HERE

/*
* HTMLhandler
*
*/

//Indexhandler
handlers.index = function(data,callback){
//  callback(undefined,undefined,'html');
// Reject any request that isn't  a GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Uptime Monitoring - Made Simple',
      'head.description' : 'We ofer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
    //  'body.title' : 'Hello templated world!',
      'body.class' : 'index'
    }

    // Read in a template as a string
    helpers.getTemplate('index',templateData,function(err,str){
      if(!err && str){
//        callback(200,str,'html');
      // Add the universal header and footer
      helpers.addUniversalTemplates(str,templateData,function(err,str){
        if(!err && str){
          // Return that page as HTML
          callback(200,str,'html');
        } else {
          callback(500,undefined,'html');
        }
      });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Create account
handlers.accountCreate = function(data,callback){
//  console.log("HERE");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Create an account',
        'head.description' : 'Signup is easy and only takes a few seconds',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'accountCreate'
      }

      // Read in a template as a string
      helpers.getTemplate('accountCreate',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Create New Session
handlers.sessionCreate = function(data,callback){
//  console.log("HERE");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Login to your account',
        'head.description' : 'Please enter your phone number and password to access your account.',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'sessionCreate'
      }

      // Read in a template as a string
      helpers.getTemplate('sessionCreate',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Session has been deleted
handlers.sessionDeleted = function(data,callback){
//  console.log("HERE");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Logged Out',
        'head.description' : 'You have been logged out of your account.',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'sessionDeleted'
      }

      // Read in a template as a string
      helpers.getTemplate('sessionDeleted',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Edit your account
handlers.accountEdit = function(data,callback){
//  console.log("HEREIAM");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Account Settings',
    //    'head.description' : 'You have been logged out of your account.',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'accountEdit'
      }

      // Read in a template as a string
      helpers.getTemplate('accountEdit',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Account has been deleted
handlers.accountDeleted = function(data,callback){
//  console.log("HEREIAM");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Account Deleted',
        'head.description' : 'Your account hasbeen deleted',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'accountDeleted'
      }

      // Read in a template as a string
      helpers.getTemplate('accountDeleted',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Create a new check
handlers.checksCreate = function(data,callback){
//  console.log("HEREIAM");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Create a New Check',
  //      'head.description' : 'Your account hasbeen deleted',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'checksCreate'
      }

      // Read in a template as a string
      helpers.getTemplate('checksCreate',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Dashboard (view all checks)
handlers.checksList = function(data,callback){
//  console.log("HEREIAM");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Dashboard',
  //      'head.description' : 'Your account hasbeen deleted',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'checksList'
      }

      // Read in a template as a string
      helpers.getTemplate('checksList',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// Edit a check
handlers.checksEdit = function(data,callback){
//  console.log("HEREIAM");
  //  callback(undefined,undefined,'html');
  // Reject any request that isn't  a GET
    if(data.method == 'get'){

      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'Check Details',
  //      'head.description' : 'Your account hasbeen deleted',
      //  'body.title' : 'Hello templated world!',
        'body.class' : 'checksEdit'
      }

      // Read in a template as a string
      helpers.getTemplate('checksEdit',templateData,function(err,str){
        if(!err && str){
  //        callback(200,str,'html');
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};

// favicon
handlers.favicon = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('favicon.ico',function(err,data){
      if(!err && data){
        callback(200,data,'favicon');
      } else {
        calback(500);
      }
    });
  } else {
    callback(405);
  }
};


// Public assets
handlers.public = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName,function(err,data){
        if(!err && data){
          // Determine the content type (default to plain text)
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }

          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200,data,contentType);

        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};
/*
* JSON API handlers*
*/

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
            callback(200,{'Success' : 'User created successfully'});
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
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
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
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
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
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

      // Verify that the given token is valid for the phone number
      handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
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
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
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
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users',phone,function(err,userData){
          if(!err && userData){
            _data.delete('users',phone,function(err){
              if(!err){
                // Delete each of the checks asssociated with the user
                var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                var checksToDelete = userChecks.length;
                if(checksToDelete > 0){
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the checks
                  userChecks.forEach(function(checkId){
                    // Delete the check
                    _data.delete('checks',checkId,function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if(checksDeleted == checksToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Errors encountered while attempting to delete all of the user\'s checks. All checks may not have been deleted from the system successfully'});
                        }
                      }
                    });

                  });



                } else {
                  callback(200);
                }




              //  callback(200);
              } else {
                callback(500,{'Error' : 'Could not delete the specified user'});
              }
            });
          } else {
            callback(400,{'Error' : 'Could not find the specified user'});
          }
        });
      } else {
        callback(403,{'Error' : 'Missing required token in header, or token is invalid'});
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
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback){
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens',id,function(err,data){
      if(!err && data){
        _data.delete('tokens',id,function(err){
          if(!err){
            callback(200);
          } else {
            callback(500,{'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400,{'Error' : 'Could not find the specified token'});
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
  // Lookup the token
  _data.read('tokens',id,function(err,tokenData){
    if(!err && tokenData){
      // Check that the token is for the given user and has not expired
      if(tokenData.phone == phone && tokenData.expires > Date.now()){
        callback(true);
      } else {
        if(tokenData.expires < Date.now()){
          console.log("The token is expired");
          // ",human.hm(tokenData.expires)+"  "+human.hm(Date.now())+"\n"+err+"\n");
        };
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// Checks
handlers.checks = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._checks[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for all the checks methods
handlers._checks = {};


// Checks - post
// Required data: protocol, url, method, successCodes, timeoutSeconds
// Optional data: none

handlers._checks.post = function(data,callback){
  var protocol = typeof(data.payload.protocol)  == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url)  == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method)  == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes)  == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds)  == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if(protocol && url && method && successCodes && timeoutSeconds){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user by reading the token
    _data.read('tokens',token,function(err,tokenData){
      if(!err && tokenData){
        var userPhone = tokenData.phone;

        // Lookup the user data
        _data.read('users',userPhone,function(err,userData){
          if(!err && userData){
            var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
            // Verify that the user has less than the number of max-checks-per-user
            if(userChecks.length < config.maxChecks){
              // Create a random id for the check
              var checkId = helpers.createRandomString(20);

              // Create the check object, and include the user's phone
              var checkObject = {
                'id' : checkId,
                'userPhone' : userPhone,
                'protocol' : protocol,
                'url' : url,
                'method' : method,
                'successCodes' : successCodes,
                'timeoutSeconds' : timeoutSeconds
              };

              // Save the object
              _data.create('checks',checkId,checkObject,function(err){
                if(!err){
                  // Add the check id to the user's object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  _data.update('users',userPhone,userData,function(err){
                    if(!err){
                      // Return the data about the new check
                      callback(200,checkObject);
                    } else {
                      callback(500,{'Error' : 'Could not update the user with the new check'});
                    }
                  });
                } else {
                  callback(500,{'Error' : 'Could not create the new check'});
                }
              });
            } else {
              callback(400,{'Error' : 'The user already has the maximum number of checks ('+config.maxChecks+')'});
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required inputs, or inputs are invalid'});
  }
};

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = function(data,callback){
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the check
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){
        // Get the token that sent the request
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if(tokenIsValid){
            // Return check data
            callback(200,checkData);
          } else {
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400,{'Error' : 'Missing required field, or field invalid'})
  }
};

// Checks - put
// Required data : id
// Optional data : protocol, url, method,successCodes, timeoutSeconds (one must be set)
handlers._checks.put = function(data,callback){
  // Check for the required field
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

  // Check for the optional fields
  var protocol = typeof(data.payload.protocol)  == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
  var url = typeof(data.payload.url)  == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method)  == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
  var successCodes = typeof(data.payload.successCodes)  == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds)  == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  // Check to make sure id is valid
  if(id){
    // Check to make sure one or more optional fields has been sent
    if(protocol || url || method || successCodes || timeoutSeconds){
      // Lookup the check
      _data.read('checks',id,function(err,checkData){
        if(!err && checkData){
          // Get the token that sent the request
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            if(tokenIsValid){
              // Update the check where necessary
              if(protocol){
                checkData.protocol = protocol;
              }
              if(url){
                checkData.url = url;
              }
              if(method){
                checkData.method = method;
              }
              if(successCodes){
                checkData.successCodes = successCodes;
              }
              if(timeoutSeconds){
                checkData.timeoutSeconds = timeoutSeconds;
              }

              // Store the new updates
              _data.update('checks',id,checkData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the check'});
                }
              });
            } else {
              callback(403);
            }
          });


        } else {
          callback(400,{'Error' : 'Check ID did not exist'});
        }
      });

    } else {
      callback(400,{'Error' : 'Missing fields to update (optional fields)'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field'});
  }
};

// Cheks - delete
// Required data : id
// Optional data : none
handlers._checks.delete = function(data,callback){

  // Check that the id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){

    // Lookup the check
    _data.read('checks',id,function(err,checkData){
      if(!err && checkData){

        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        // Verify that the given token is valid for the phone number
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
          if(tokenIsValid){

            // Delete the check data
            _data.delete('checks',id,function(err){
              if(!err){

                // Lookup the user
                _data.read('users',checkData.userPhone,function(err,userData){
                  if(!err && userData){
                    var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];

                    // Remove the deleted check from their list of cheks
                    var checkPosition = userChecks.indexOf(id);
                    if(checkPosition > -1){
                      userChecks.splice(checkPosition,1);

                      // Re-save the user's data
                      _data.update('users',checkData.userPhone,userData,function(err){
                        if(!err){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Could not update the user'});
                        }
                      });

                    } else {
                      callback(500,{'Error' : 'Could not find the check on the user\'s object,so could not remove it'});
                    }
                  } else {
                    callback(500,{'Error' : 'Could not find the user who created the check, so could not remove the check from the list of checks on the user object'});
                  }
                });
              } else {
                callback(500,{'Error' : 'Could not delete the check data'});
              }
            });
          } else {
            callback(403);
          }
        });
        } else {
          callback(400,{'Error' : 'The check ID specified could not be found'});
        }
      });
      } else {
        callback(400,{'Error' : 'Missing valid ID'});
      }
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

// Twilio handler
handlers.twilio = function(data,callback){
  var opt = helpers.parseJsonToObject(data.payloadJson);

  const messageBody = {
    "username": "Twilio notifier", // This will appear as user name who posts the message
    "text": opt.Body, // text
    "icon_emoji": ":bangbang:", // User icon, you can also use custom icons here
    "attachments": [{ // this defines the attachment block, allows for better layout usage
      "color": "#eed140", // color of the attachments sidebar.
      "fields": [ // actual fields
        {
          "title": "Environment:", // Custom field
          "value": "Production", // Custom value
          "short": true // long fields will be full width
        },
        {
          "title": "User:",
          "value": opt.From,
          "short": true
        }
      ]
    }]
  };

if(opt.Body){
  //console.log(config.WebHookURL);
  slack.send(config.slackURL,messageBody);
//  console.log(opt);
//  console.log(opt.Body);
}
  callback(200);

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
