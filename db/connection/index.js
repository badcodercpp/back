const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'bjshub',
  password : 'Bjshub@123',
  database : 'bjshub'
});

export default connection;
 