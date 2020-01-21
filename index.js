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
