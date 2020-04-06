const bcrypt = require('bcrypt');
let passrd = bcrypt.hashSync('12345',9);
console.log(passrd);