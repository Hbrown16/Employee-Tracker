-- DROP DATABASE
DROP DATABASE IF EXISTS employee_db;

-- CREATE DATABASE
CREATE DATABASE employee_db;

-- USE DATABASE
USE employee_db;

-- Creates table for department
CREATE TABLE department (
    id INTERGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Create table for role
-- table of employees parent

CREATE TABLE employeeRole (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_department_id FORGEIN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

-- Create employee table 
-- child table of employee role
CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    lats_name VARCHAR(30) NOT NULL,
    role_id INTEGER NULL,
    manager_id INTEGER NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_role_id FORGEIN KEY (role_id)
    REFERENCES employeeRole(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT FK_manager_id FOREIGN KEY (manager_id)
    REFERENCES employeeRole(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);