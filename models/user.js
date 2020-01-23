const ActiveRecord = require('./index.js');

class User extends ActiveRecord {
  static table_name = 'users';

  constructor(data) {
    super({
      table_name: 'users',
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
  } 
}

module.exports = User;
