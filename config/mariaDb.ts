import mysql from "mysql2/promise";

// eslint-disable-next-line import/prefer-default-export
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "megak_santa_list",
  namedPlaceholders: true,
  decimalNumbers: true,
  // rowsAsArray: true,
});
