require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect(function(err) {
  if (err) { console.error.bind(console, 'MySQL connection error:') }
  console.log('MySQL connected!');
});

module.exports.connection = connection;
