const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'top_songsDB',
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

function start() {

}

function add() {

}

function view() {

}