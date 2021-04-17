const connection = require('./connection');

class ConstructRole {
    constructor() {
        this.connection = connection;
    }
    getAllRoles() {
        return this.connection.query("SELECT * FROM roles")
    }
    addRole(roleName, roleSalary, depId) {
        return this.connection.query("INSERT INTO roles (title, salary, dep_id) VALUES (?, ?, ?);", [roleName, roleSalary, depId])
    }
}



module.exports = ConstructRole;