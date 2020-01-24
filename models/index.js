const fs = require('fs').promises;

class ActiveRecord {
  static table_name;

  constructor(data) {
    if (typeof data.id !== 'number') {
      data.id = this.constructor.storage.length + 1;
    }

    this.id = data.id;
    delete data.id;

    for (let i in data) {
      this[i] = data[i];
    }
  }  
 
  save() {
    return new Promise((resolve, reject) => {
      fs.readdir(`${__dirname}/../data/`)
        .then(async files => {
          files = files.filter(i => i == this.constructor.table_name + '.json');
          let data;

          let index = this.#findPosition();

          if (files.length == 0) {
            // If file didn't exist then we should really create the file first!

            await fs.writeFile(this.constructor.filename, '[]');
            data = this.constructor.storage;
            data.push(this);
          } else if(index > -1) {
            // if the file already exist then findPosition will return > -1 then we should overwrite the element.
            data = this.constructor.storage;
            // Replace that object in the array.
            data[index] = this;
          } else {
            data = this.constructor.storage;
            data.push(this);
          }

          await fs.writeFile(this.constructor.filename, JSON.stringify(data, null, 2)); 
          resolve(this); 
        })
    })
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      if (typeof data !== 'object') throw new Error("Data should have been an object")

      this.find(id)
        .then(instance => {
          // Check if the only valid parameter could set the new value;
          for (let i in data) {
            if (instance[i] !== undefined) {
              instance[i] = data[i]
            }
          }

          // Return new promise, so we can just .then again
          return instance.save()
        })
        .then(instance => {
          console.log('Update:', instance.id)
          console.log('In:', this.table_name);
          console.log('Status:', true);
          resolve(instance);
        })
        .catch(err => {
          console.log('Update:', instance.id)
          console.log('In:', this.table_name);
          console.log('Status:', false);
          reject(err);
        })
    })
  }

  #findPosition = () => {
    return this.constructor.storage.findIndex(i => i.id == this.id);
  }

  static remove() {
    return new Promise(async resolve => {
      await fs.writeFile(this.filename, '[]');
      resolve(`${this.table_name} is cleaned up!`)
    }) 
  }

  static all() {
    return new Promise(resolve => {
      let data = this.storage; 
      // Create instance for each of the data
      let result = data.map(i => new this(i));

      resolve(result);
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      let data = this.storage; 
      data = data.filter(i => i.id == id);

      if (data.length == 0) return reject(`${this.table_name} not found!`);

      resolve(new this(data[0])); 
    })
  }

  static get storage() {
    return require(this.filename);
  }

  static get filename() {
    return `${__dirname}/../data/${this.table_name}.json`;
  }
}

module.exports = ActiveRecord;
