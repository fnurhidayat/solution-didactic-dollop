const ActiveRecord = require('./index.js');

class User extends ActiveRecord {
  constructor() {
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
