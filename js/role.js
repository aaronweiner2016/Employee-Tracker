const connection = require('./connection');

class ConstructRole {
    constructor() {
        this.connection = connection;
    }
    getAllRoles() {
        return this.connection.query("SELECT * FROM roles")
    }
    addRole(roleName, roleSalary) {
        return this.connection.query("INSERT INTO roles (title, salary) VALUES (?, ?);", [roleName, roleSalary])
    }
}



module.exports = ConstructRole;