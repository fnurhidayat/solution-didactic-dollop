const ActiveRecord = require('./index.js');

class Post extends ActiveRecord {
  static table_name = 'posts';

  constructor(data) {
    super({
      data: {
        title: data.title,
        body: data.body
      }
    })
  }

}

module.exports = Post;
