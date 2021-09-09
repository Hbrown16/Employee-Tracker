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
    ON UPDATE CASECADE
);