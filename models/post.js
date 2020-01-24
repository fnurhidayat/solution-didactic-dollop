const ActiveRecord = require('./index.js');

class Post extends ActiveRecord {
  static table_name = 'posts';

  constructor({ id, title, body }) {
    super({
      id, title, body
    })
  }
}

module.exports = Post;
