// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'ACee14f2919ab6bc7b1f82c2a15af09f0b';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

client.validationRequests
  .create({friendlyName: 'My Home Phone Number', phoneNumber: '+77072065149'})
  .then(validation_request => console.log(validation_request.friendlyName));
