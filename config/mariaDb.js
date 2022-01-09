const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'megak_santa_list',
  namedPlaceholders: true,
  decimalNumbers: true,
  // rowsAsArray: true,
});

module.exports = { pool };
