var args = process.argv.slice(2);
var [ method ] = args;
var User = require('./models/user.js');
var Post = require('./models/post.js');
var id;

switch(method) {
  case 'create_users':
    let [
      name,
      email,
      password,
      password_confirmation
    ] = args.slice(1)
    
    let user = new User({
      name, email, password, password_confirmation
    });
    
    user.save();
    break;

  case 'read_user_by_id':
    id = args[1];
    User.find(id)
      .then(data => console.log(data))
      .catch(err =>  console.error(err));
    break;

  case 'read_post_by_id':
    id = args[1];
 
    Post.find(id)
      .then(data => console.log(data))
      .catch(err =>  console.error(err));
    break;

  case 'create_posts':
    let [
      title,
      body
    ] = args.slice(1)

    let post = new Post({
      title, body
    })
    post.save();
    break;

  default:
    console.log('Unknown Operation!');
}

