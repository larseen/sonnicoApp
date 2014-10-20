'use strict';

var config = require('../config/config');
var nodemailer = require('nodemailer');

var EmailAddressRequiredError = new Error('email address required');

// create a defaultTransport using gmail and authentication that are
// storeed in the `config.js` file.
var transporter = nodemailer.createTransport('SMTP', {
 service: 'Gmail',
 auth: {
   user: config.mailer.auth.user,
   pass: config.mailer.auth.pass
 }
});

exports.sendRegistrationMail = function (locals, fn) {
 // make sure that we have an user email
 if (!locals.email) {
   return fn(EmailAddressRequiredError);
 }
 var mailOptions = {
    from: config.mailer.defaultFromAddress,
    to: locals.email,
    subject: 'Velkommen til Sønnico oppfølginsportal',
    text: 'Velkommen '+locals.name+', '+'ditt passord er: '+locals.password
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
};

exports.sendResetPasswordMail = function(locals, fn) {
   if (!locals.email) {
   return fn(EmailAddressRequiredError);
 }
 var mailOptions = {
    from: config.mailer.defaultFromAddress,
    to: locals.email,
    subject: 'Sønnico oppfølginsportal, passord reset',
    text: 'Ditt nye passord er '+locals.password+', Vennligst bytt dette med en gang.'
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
};