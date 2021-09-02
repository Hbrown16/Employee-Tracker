const inquirer = require('inquirer');
const { start } = require('repl');
const connection = require('./config/connect');


connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome what would you like to do?',
        choices: [
            'Add Employee',
            "Add Roles",
            "Add Departments",
            "View Departments, Roles, or Employees?",
            "Update Employee Roles",
            "Delete Employee",
            "Exit",
        ],
    })
}