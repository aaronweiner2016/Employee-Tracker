const connection = require('./connection');

class ConstructDepartment {
    constructor() {
        this.connection = connection;
    }
    getAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }
    addDepartments(depName) {
        return this.connection.query("INSERT INTO department (dep_name) VALUES (?);", [depName])
    }
}



module.exports = ConstructDepartment;
