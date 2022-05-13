/*
* Create and export configuration variables
*
*
*/
// Container for all environments
var environments = {};
// Staging (default) environments
environments.staging = {
  'httpPort' : 3333,
  'httpsPort' : 3331,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'slackURL' : 'https://hooks.slack.com/services/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',
  'twilio' : {
    'accountSid' : 'ACee14f2919ab6bc7b1f82c2a15af09f0b',
    'authToken' : '7c438f1be8dfda48df35d58e8f02eb6d',
        'fromPhone' : '+14155238886'


/*    'accountSid' : '',
*    'authToken' : '[Redacted]',
*    'fromPhone' : '+14155238886'
*/  }
};

// Production environments
environments.production = {
  'httpPort' : 5555,
  'httpsPort' : 5551,
  'envName' : 'production',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'slackURL' : 'https://hooks.slack.com/services/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',
  'twilio' : {
    'accountSid' : 'ACee14f2919ab6bc7b1f82c2a15af09f0b',
    'authToken' : '7c438f1be8dfda48df35d58e8f02eb6d',
    'fromPhone' : '+14155238886'
  }
};

// Twilio environments
environments.twilio = {
  'httpPort' : 8889,
  'httpsPort' : 8998,
  'envName' : 'twilio',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'slackURL' : 'https://hooks.slack.com/services/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',
  'twilio' : {
    'accountSid' : 'ACee14f2919ab6bc7b1f82c2a15af09f0b',
    'authToken' : '7c438f1be8dfda48df35d58e8f02eb6d',
    'fromPhone' : '+14155238886'
  }
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
