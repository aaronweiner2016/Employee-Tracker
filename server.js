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
                'Update employee',
                'Update employee manager',
                'View all departments',
                'Add department',
                'Search by manager',
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

                case 'Update employee':
                    updateEmployeeRole();
                    break;

                case 'View all departments':
                    departmentDB.getAllDepartments().then((depResults) => {
                        console.table(depResults);
                        start();
                    })
                    break;

                case 'Update employee manager':
                    updateEmployeeManager();
                    break;

                case 'Search by manager':
                    searchByManager();
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

function employee() {
    connection.query('SELECT * FROM roles', (err, results) => {
        connection.query('SELECT * FROM managers', (errr, results2) => {
            if (err) throw err;
            if (errr) throw err;
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
                            const choiceArray2 = [];
                            results2.forEach(({ first_name }) => {
                                choiceArray2.push(first_name);
                            });
                            return choiceArray2;
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

function updateEmployeeRole() {
    connection.query('SELECT * FROM employee', (err, results) => {
        connection.query('SELECT * FROM roles', (errr, results1) => {

            if (err) throw err;
            if (errr) throw errr;

            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'What employee would you like to update?',
                        name: 'employee',
                        choices() {
                            const choiceArray = [];
                            results.forEach(({ first_name }) => {
                                choiceArray.push(first_name);
                            });
                            return choiceArray;
                        },
                    },
                    {
                        type: 'list',
                        message: 'What is the role for this employee?',
                        name: 'role',
                        choices() {
                            const choiceArray2 = [];
                            results1.forEach(({ title }) => {
                                choiceArray2.push(title);
                            });
                            return choiceArray2;
                        },
                    }
                ])
                .then(({ employee, role }) => {
                    const filteredRoleType = results1.filter(value => value.title === role)[0].id

                    employeeDB.updateRole(filteredRoleType, employee).then((roleResults) => {
                        employeeDB.getAllEmployees().then((employeeResults) => {
                            console.log("Successfully added role!!")
                            console.table(employeeResults);
                            start();
                        })

                    })
                })
        })
    })
}

function updateEmployeeManager() {
    connection.query('SELECT * FROM employee', (err, results) => {
        connection.query('SELECT * FROM managers', (errr, results1) => {

            if (err) throw err;
            if (errr) throw errr;

            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: 'What employee would you like to update?',
                        name: 'employee',
                        choices() {
                            const choiceArray = [];
                            results.forEach(({ first_name }) => {
                                choiceArray.push(first_name);
                            });
                            return choiceArray;
                        },
                    },
                    {
                        type: 'list',
                        message: 'What is the new manager of this employee?',
                        name: 'manager',
                        choices() {
                            const choiceArray2 = [];
                            results1.forEach(({ first_name }) => {
                                choiceArray2.push(first_name);
                            });
                            return choiceArray2;
                        },
                    }
                ])
                .then(({ employee, manager }) => {
                    const filteredRoleType = results1.filter(value => value.first_name === manager)[0].id
                    employeeDB.updateManager(filteredRoleType, employee).then((roleResults) => {
                        employeeDB.getAllEmployees().then((employeeResults) => {
                            console.log("Successfully added role!!")
                            console.table(employeeResults);
                            start();
                        })

                    })
                })
        })
    })
}

const searchByManager = () => {
    connection.query('SELECT * FROM managers', (err, results) => {
        if (err) throw err;

        inquirer
            .prompt({
                name: 'managers',
                type: 'list',
                message: 'What manager would you like by?',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name }) => {
                        choiceArray.push(first_name);
                    });
                    return choiceArray;
                },
            })
            .then(({ managers }) => {
                const filteredRoleType = results.filter(value => value.first_name === managers)[0].id
                const query = 'SELECT id, first_name, last_name, role_id FROM employee WHERE ?;';
                connection.query(query,  filteredRoleType , (err, res) => {
                    if (err) throw err;
                    const arrayOfManagers = res.map(({ id, first_name, last_name, role_id }) => {
                        return { id, first_name, last_name, role_id }
                    });
                    console.table(arrayOfManagers);
                    start();
                });
            });
    })
};
////////////////////////////////this is not done

function role() {
    connection.query('SELECT * FROM department', (err, results3) => {
        if (err) throw err;

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
                },
                {
                    type: 'list',
                    message: 'What department is this roles in?',
                    name: 'departmentName',
                    choices() {
                        const choiceArray3 = [];
                        results3.forEach(({ dep_name }) => {
                            choiceArray3.push(dep_name);
                        });
                        return choiceArray3;
                    },
                }
            ])
            .then(({ title, salary, departmentName }) => {
                const filterDepartmentType = results3.filter(value => value.dep_name === departmentName)[0].id

                roleDB.addRole(title, salary, filterDepartmentType).then((roleResults) => {
                    roleDB.getAllRoles().then((roleResults) => {
                        console.log("Successfully added role!!")
                        console.table(roleResults);
                        start();
                    })

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


