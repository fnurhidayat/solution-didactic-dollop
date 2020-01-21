var args = process.argv.slice(2);
var [ method ] = args;

var create = require('./libs/create.js');
var read = require('./libs/read.js');
var update = require('./libs/update.js');

switch(method) {
  case 'create_users':
    let [
      name,
      email,
      password,
      password_confirmation
    ] = args.slice(1)

    create.user({
      name, email, password, password_confirmation 
    });
    break;
  case 'create_posts':
    let [
      title,
      body
    ] = args.slice(1);

    create.post({
      title, body
    });
    break;

  /* Read User */
  case 'read_user_by_id':
    id = args.slice(1)[0];

    read.byId(id, 'users');
    break;

  case 'read_users':
    read.all('users');
    break;

  case 'read_post_by_id':
    id = args.slice(1)[0];

    read.byId(id, 'posts');
    break;

  case 'read_posts':
    read.all('posts');
    break;

  case 'update_users':
    id = args.slice(1)[0];
    obj = args.slice(1)[1];

    try {
      obj = JSON.parse(obj);
      update.user(id, obj);
    }

    catch {
      console.log('Invalid input!')
    }
    break;

  case 'update_posts':
    id = args.slice(1)[0];
    obj = args.slice(1)[1];

    try {
      obj = JSON.parse(obj);
      update.posts(id, obj);
    }

    catch {
      console.log('Invalid input!')
    }

    break;

  default:
    console.log('Unknown operation!')
}
