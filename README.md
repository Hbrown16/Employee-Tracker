# Employee-Tracker

## Table of Contents
1. [Description](##Description)
2. [Application Links](##Application-Links)
3. [Demo Video](##Demo-Video)
4. [Requirements](##Requirements)

## Description
1. Update
2. Add Employee
3. Add Role
4. Add Departments
5. Delete
6. View All
7. Exit

## Application Links

[Github Repo Link](https://github.com/Hbrown16/Employee-Tracker)

## Demo Video
[Video Link](https://watch.screencastify.com/v/olVJW5UgMDaMvHZ6KPh4)

## Requirements
Design the following database schema containing three tables:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

Bonus points if you're able to:

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

