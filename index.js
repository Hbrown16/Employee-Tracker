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
        .then((answer) => {
            const query = 'INSERT INTO employeeRole SET?';
            connnection.query(query,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Role added Successful");
                    start();
                });
        });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'department',
                type: 'input',
                message: 'Department Title?'
            },
        ])
        .then((answer) => {
            const query = 'INSERT INTO department SET?';
            connection.query(query,
                {
                    deprtment_name: answer.department,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Department added Successful");
                    start();
                });
        });
};

const viewAll = () => {
    connection.query('SELECT * FROM employee', (err,res) => {
        if (err) throw err;
        console.log('\n');
        console.log('----Employees----');
        res.forEach(({first_name, lst_name, role_id}) => {
            console.log(`FirstName: ${first_name} | LstName: ${lst_name} | RoleId: ${role_id}`);
        });
        console.log('--------');
    });
        connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log('\n');;
        console.log('----Departments----');
        res.forEach(({ department_name}) => {
            console.log(`DepartmentName: ${deparment_name}`);
        });
        console.log('--------');
        console.log('\n');
    });

    connection.query('SELECT * FROM employeeRole', (err, res) => {
    if (err) throw err;
    console.log('----Roles----');
    res.forEach(({ title, salary, department_id}) => {
        console.log(`Title: ${title} | Salary: ${salary} | DepartmentId: ${department_id}`);
    });
    console.log('--------');
    console.log('\n');    
  });
  start();
};

const deleteEmployee = () {
    console.log('Employee delete..\n');
    inquirer
    .prompt([
        {
            name: 'delete',
            type: 'input',
            message: 'Type you would like to delete',
        }
    ])
        .then((answer) => {
    const query = 'DELETE FROM employee WHERE ?';
    
        })
}
