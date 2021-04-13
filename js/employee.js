const connection = require('./connection');
class ConstructEmployee {
    constructor() {
        this.connection = connection;
    }
    getAllEmployees() {
        return this.connection.query("SELECT * FROM employee")
    }
    getAllManagers() {
        return this.connection.query("SELECT * FROM managers")
    }
    addEmployee(firstName, lastName, roleId, manager) {
        return this.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);", [firstName, lastName, roleId, manager])
    }
    addManager(firstName, lastName, roleId) {
        return this.connection.query("INSERT INTO managers (first_name, last_name, role_id) VALUES (?, ?, ?);", [firstName, lastName, roleId])
    }
}




module.exports = ConstructEmployee;
