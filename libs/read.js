function readById(input_id, table) {
  let data = require(`../data/${table}.json`);
  data = data.filter(i => i.id == input_id);

  if (data.length == 0) {
    console.log(`${table} not found!`);
    return;
  }
  delete data[0].password;

  console.log(`${table}:`, data[0])
}

function readAll(table) {
  let data = require(`../data/${table}.json`);

  data = data.map(i => {
    delete i.password;
    return i; 
  })

  console.log(`${table}:`, data);
}

module.exports = {
  all: readAll,
  byId: readById
}
