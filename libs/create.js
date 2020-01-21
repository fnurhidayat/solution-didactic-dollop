var fs = require('fs');

var schema = {
  users: {
    name: 'string',
    email: 'string',
    password: 'string'
  }, 
  posts: {
    title: 'string',
    body: 'string'
  }
}

function isValid(data, schema) {
  for (let i in schema) {
    if (schema[i] !== typeof data[i]) {
      console.log(`${data[i]} should have been ${schema[i]}!`);
      return false;
    }
  }

  return true;
}

function createUser(data) {
  if (!isValid(data, schema.users)) return;

  if (data.password !== data.password_confirmation) {
    console.log("Password and its confirmation doesn't match!");
    return;
  }

  delete data.password_confirmation;

  let users = require('../data/users.json') || [];
  data.id = users.length + 1;

  let {
    id, name,
    email, password
  } = data;

  users.push({
    id, name, email, password
  });

  fs.writeFileSync(
    `./data/users.json`,
    JSON.stringify(users, null, 2)
  ); 

  console.log('User created!');
  console.log('User:', {
    id, name, email
  });
}

function createPost(data) {
  if (!isValid(data, schema.posts)) return;

  let posts = require('../data/posts.json') || [];
  data.id = posts.length + 1;

  let {
    id, title, body
  } = data;
  posts.push({
    id, title, body
  })

  fs.writeFileSync(
    `./data/posts.json`,
    JSON.stringify(posts, null, 2)
  ); 

  console.log('Data created!')
}

module.exports = {
  user: createUser,
  post: createPost
};
