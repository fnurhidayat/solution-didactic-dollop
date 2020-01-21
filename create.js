var fs = require('fs');

function createData(email, password, password_confirmation) {
  if (!email && !password && !password_confirmation) {
    console.log("Data isn't valid!");
    return;
  }

  if (password !== password_confirmation) {
    console.log("Password and its confirmation doesn't match!");
    return;
  }

  let data = {
    email: email,
    password: password,
    password_confirmation: password_confirmation
  }

  let files = fs.readdirSync('./data');
  fs.writeFileSync(
    `./data/${files.length + 1}.json`,
    JSON.stringify(data)
  ); 

  console.log('Data created!')
}

module.exports = createData;
