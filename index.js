/*
 * 1. Create function to create data, which require 3 arguments
 * 2. The arguments are:
 *    - Email
 *    - Password
 *    - Password Confirmation
 * 2. In create data, check if password and password_confirmation is equal
 * 3. If so, then create new data in ./data folder
 * 4. If not, just reject.
 * */

var create = require('./create.js');
var args = process.argv.slice(2);

switch(args[0]) {
  case 'create_users':
    var email = args[0];
    var password = args[1];
    var password_confirmation = args[2];

    create(email, password, password_confirmation);
  default:
    console.log('Unknown operation!')
}
