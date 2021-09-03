const inquirer = require('inquirer');
const { type } = require('os');
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
    .then((answer) => {
        switch (answer.action) {
           case "Add Employees":
               addEmployee();
               break; 
           case 'Add Roles':
               addRole();
               break;
           case 'Add Departments':
               addDepartment();
               break;
           case 'Update Employee Roles':
               updateRole();
               break;
           case "View Departments, Roles, or Employees?":
               viewAll();
               break;
           case 'Delete Employee':
               deleteEmployee();
               break;
           case 'Exit':
               connection.end();
               break;
           default:
               console.log(`Inadequte Action: ${answer.action}`);                  

        }
    });
};

const addEmployee = () => {
    inquirer
     .prompt([
         {
             name: 'firstName',
             type: 'input',
             message: 'What is the Employees first name?',
         },
         {
             name: 'lastName',
             type: 'input',
             message: 'What is the employees last name?',
         },
         {
             name: 'roleId',
             type: 'list',
             message: 'What is the role of the employee?',
             choices: [
                 'Application Developer',
                 'Cyber Security Analyst',
                 'IT Specialist',
                 'Software Developer',
                 'Hardware Developer',
                 'Manager',
             ]
         },
     ])
     .then((answer) => {
         const query = 'INSERT INTO employee SET?';
         connection.query(query,
            {
                first_name: answer.firstName,
                lst_name: answer.lastName,
                role_id: answer.roleId,
            },
            (err) => {
            if (err) throw err;
            console.log("Employee added Successful");
            start();
        });
     });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Title?',
            },
            {
                name: 'salary',
                type: 'input',
                message: "What is their salary?"
            },
            {
                name: 'departmentId',
                type: 'list',
                message: 'What is their department',
                choices: [
                    'Application Developer',
                    'Cyber Security Analyst',
                    'IT Specialist',
                    'Software Developer',
                    'Hardware Developer',
                    'Manager',
                ]
            }, 
        ])
        .then((answer => {
            const query = 'INSERT INTO employeeRole SET?';
        }))
}
