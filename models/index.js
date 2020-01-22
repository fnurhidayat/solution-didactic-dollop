const fs = require('fs');

class ActiveRecord {

  constructor(data) {
    this.table_name = data.table_name;
    this.data = data.data;
  }
 
  save() {
    fs.writeFileSync(`./${this.table_name}.json`, JSON.stringify(this.data, null, 2)); 
  }
}

module.exports = ActiveRecord;
