const inquirer = require('inquirer');
const role = require('./role');
// const start = require('./start');
const connection = require('./connection');

class ConstructEmployee {
    constructor() {
        this.connection = connection;
    }
    getAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    }
}



module.exports = ConstructEmployee;
