const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = require("./js/connection");
const ConstructEmployee = require("./js/employee")
const ConstructDepartment = require("./js/department");
const ConstructRole = require("./js/role");

const employeeDB = new ConstructEmployee();
const departmentDB = new ConstructDepartment();
const roleDB = new ConstructRole();


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
                'View all departments',
                'Add department',
                'View roles',
                'Add roles',
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

                case 'View all departments':
                    departmentDB.getAllDepartments().then((depResults) => {
                        console.table(depResults);
                        start();
                    })
                    break;

                case 'Add department':
                    department();
                    break;

                case 'Add employee':
                    employee();
                    break;

                case 'Add roles':
                    role();
                    break;

                case 'View roles':
                    roleDB.getAllRoles().then((roleResults) => {
                        console.table(roleResults);
                        start();
                    })
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

// const artistSearch = () => {
//     inquirer
//       .prompt({
//         name: 'artist',
//         type: 'input',
//         message: 'What artist would you like to search for?',
//       })
//       .then((answer) => {
//         const query = 'SELECT position, song, year FROM top5000 WHERE ?';
//         connection.query(query, { artist: answer.artist }, (err, res) => {
//           if (err) throw err;
//           res.forEach(({ position, song, year }) => {
//             console.log(
//               `Position: ${position} || Song: ${song} || Year: ${year}`
//             );
//           });
//           runSearch();
//         });
//       });
//   };

function employee() {
    connection.query('SELECT * FROM roles', (err, results) => {
        connection.query('SELECT * FROM managers', (errr, results2) => {
            if (err) throw err;
            if (errr) throw err;

            console.log(results2);
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
                        choices() {
                            const managerArrays = [];
                            const choiceArray = [];
                            results.forEach(({ title }) => {
                                choiceArray.push(title);
                                if (title === "Manager") {
                                    managerArrays.push(title);
                                    return managerArrays;
                                }
                            });
                            return choiceArray;
                        },
                    },
                    {
                        type: 'list',
                        message: 'Who is this employees manager?',
                        name: 'manager',
                        choices() {
                            const choiceArray = [];
                            results2.forEach(({ first_name }) => {
                                if (manager === undefined) {
                                    return 0;
                                } else {
                                    choiceArray.push(first_name);
                                }
                            });
                            return choiceArray;
                        },
                    }
                ])
                .then(({ firstName, lastName, roleType, manager }) => {

                    if (roleType === 'Manager') {
                        const filteredManagers = results.filter(val => val.title === roleType)[0].id
                        employeeDB.addManager(firstName, lastName, filteredManagers, manager).then((empResults) => {
                            employeeDB.getAllManagers().then((managerRes) => {
                                console.log("Successfully added manager!!")
                                console.table(managerRes);
                            })

                        })
                    }

                    const filterRoleType = results.filter(val => val.title === roleType)[0].id
                    const filterManagerType = results2.filter(val2 => val2.first_name === manager)[0].id

                    employeeDB.addEmployee(firstName, lastName, filterRoleType, filterManagerType).then((empResults) => {
                        employeeDB.getAllEmployees().then((empResults) => {
                            console.log("Successfully added role!!")
                            console.table(empResults);
                            start();
                        })
                    })
                })
        })
    })
}

function role() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'salary',
            }
        ])
        .then((answer) => {
            roleDB.addRole(answer.title, answer.salary).then((roleResults) => {
                roleDB.getAllRoles().then((roleResults) => {
                    console.log("Successfully added role!!")
                    console.table(roleResults);
                    start();
                })

            })
        })
}

function department() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'department',
            }
        ])
        .then((answer) => {
            departmentDB.addDepartments(answer.department).then((depResults) => {
                departmentDB.getAllDepartments().then((depResults) => {
                    console.log("Successfully added department!!")
                    console.table(depResults);
                    start();
                })

            })
        })
}


