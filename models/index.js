const fs = require('fs');

class ActiveRecord {

  constructor(data) {
    this.table_name = data.table_name;
    this.data = data.data;
  }
 
  save() {
    let files;
    fs.readdir(`${__dirname}/../data/`, (err, data) => {
      files = data;

      let filename = this.table_name + '.json';

      files = files.filter(i => i == filename);
      if (files.length == 0) {
        fs.writeFileSync(`${__dirname}/../data/${filename}`, '[]');
      }

      let dataFile = require(`${__dirname}/../data/${filename}`);
      dataFile.push(this.data);

      fs.writeFileSync(`${__dirname}/../data/${filename}`, JSON.stringify(this.data, null, 2)); 
    })
  }

  static find(id) {
    console.log(id)
  }
}

module.exports = ActiveRecord;
