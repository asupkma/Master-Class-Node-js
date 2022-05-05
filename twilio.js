const accountSid = 'ACee14f2919ab6bc7b1f82c2a15af09f0b';
const authToken = '0f4eb2f75f71f15332712dcc300140b1';
const client = require('twilio')(accountSid, authToken);


/*const accountSid = 'ACb32d411ad7fe886aac54c665d25e5c5d';
*const authToken = '9455e3eb3109edc12e3d8c92768f7a67';
*const client = require('twilio')(accountSid, authToken);
*/

client.messages
      .create({
         body: 'FUCK YOU 1238432',
         from: 'whatsapp:+14155238886',
//         from: '+15005550006',

         to: 'whatsapp:+77072065149'
       })
      .then(message => console.log(message.sid))
      .done();


//     'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
//   'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
//     'fromPhone' : '+15005550006'
//
