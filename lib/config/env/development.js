'use strict';

module.exports = {
  env: 'development',
  mongo: {
    uri: 'mongodb://localhost/sonnico-app'
  },
  mailer: {
   auth: {
     user: 'kristoffer@larsen.so',
     pass: 'Stavern1',
   },
   defaultFromAddress: 'First Last <test@examle.com>'
 }
};