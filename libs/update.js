function updateUser(input_id, obj) {
  let users = require('../data/users.json');

  let result = {};

  let data = users.map(i => {
    if (i.id == input_id) {
      for (let k in obj) {
        i[k] = obj[k];
      }
      
      result = i;
    }

    return i;
  })

  if (result === {}) {
    console.log('User not found!');
    return
  }

  delete result.password;

  console.log('User updated!');
  console.log('Users:', result);
}

function updatePost(input_id, obj) {
  let posts = require('../data/posts.json');

  let result = {};

  let data = posts.map(i => {
    if (i.id == input_id) {
      for (let k in obj) {
        i[k] = obj[k];
      }
      
      result = i;
    }

    return i;
  })

  if (result === {}) {
    console.log('Post not found!');
    return
  }

  delete result.password;

  console.log('Post updated!');
  console.log('Post:', result);
}

module.exports = {
  user: updateUser
}
