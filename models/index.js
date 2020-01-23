const fs = require('fs');

class ActiveRecord {
  static table_name;

  constructor(data) {
    this.data = data.data;
  }  
 
  save() {
    return new Promise((resolve, reject) => {
      let files;
      fs.readdir(`${__dirname}/../data/`, (err, data) => {
        files = data;

        let filename = this.constructor.table_name + '.json';

        files = files.filter(i => i == filename);
        if (files.length == 0) {
          fs.writeFileSync(`${__dirname}/../data/${filename}`, '[]');
        }

        let dataFile = require(`${__dirname}/../data/${filename}`);
        dataFile.push({
          id: (dataFile.length + 1),
          ...this.data
        });

        fs.writeFileSync(`${__dirname}/../data/${filename}`, JSON.stringify(dataFile, null, 2)); 
      }) 
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      let data = require(`${__dirname}/../data/${this.table_name}.json`)
      data = data.filter(i => i.id == id);

      if (data.length == 0) return reject(`${this.table_name} not found!`);

      resolve(new this(data[0])); 
    })
  }
}

module.exports = ActiveRecord;
