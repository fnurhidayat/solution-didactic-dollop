const ActiveRecord = require('./index.js');

class User extends ActiveRecord {
  static table_name = 'users';

  constructor({ id, name, email, password }) {
    super({
      id, name, email, password
    })
  }

  entity() {
    let { id, name, email } = this;
    return {
      id, name, email
    }
  }

}

module.exports = User;
