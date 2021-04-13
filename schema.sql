DROP DATABASE IF EXISTS addemployeeDB;
CREATE DATABASE addemployeeDB;

USE addemployeeDB;


CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  salary DECIMAL(10,4) NOT NULL,
  dep_id INT NULL,
  FOREIGN KEY (dep_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);

CREATE TABLE managers(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);



SELECT * FROM managers;

SELECT * FROM department;

SELECT * FROM roles;

SELECT * FROM employee;


INSERT INTO department (dep_name)
VALUES ("Marketing");

INSERT INTO roles (title, salary, dep_id)
VALUES ("Manager", 75000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Weiner", 1, NULL);

INSERT INTO managers (first_name, last_name, role_id, manager_id)
VALUES ("Aaron", "Weiner", 1, NULL);
