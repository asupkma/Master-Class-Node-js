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
  'maxChecks' : 5
};

// Production environments
environments.production = {
  'httpPort' : 5555,
  'httpsPort' : 5551,
  'envName' : 'production',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;
