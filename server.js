const inquirer = require('inquirer');
const mysql = require('mysql');
const ConstructEmployee = require("./js/employee")
// const role = require("./role");
const department = require("./js/department");
const connection = require("./js/connection");

const employeeDB = new ConstructEmployee();


connection.connect((err) => {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add employee',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    employeeDB.getAllEmployees().then((empResults) => {
                        console.log(empResults);
                        console.table(empResults);
                        start();
                    })
                    break;

                case 'Add employee':
                    employee();
                    break;

                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;

            }
        });
}

function employee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your first name?',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'What is your last name?',
                name: 'lastName',
            },
            {
                type: 'list',
                message: 'What is your role?',
                name: 'roleType',
                choices: ["hello"]
            }
        ])
        .then((answer) => {

            start();
        })
}

function Role() {

}

function Department() {

}


