const inquirer = require('inquirer');
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
           case "Add Employee":
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
            //    console.log(`Inadequte Action: ${answer.action}`);                  

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
             message: 'What is the role of the employee? 1 is Application Developer, 2 is Cyber Security Analyst, 3 is IT Specialist, 4 is Software Dev, 5 is Hardware Dev, 6 is Manager',
             choices: [
                 '1',
                 '2',
                 '3',
                 '4',
                 '5',
                 '6',
             ]
         },
     ])
     .then((answer) => {
         const query = 'INSERT INTO employee SET?';
         connection.query(query,
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
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
                message: 'What is their department? 1 is App Dev, 2 is Cyber Sec, 3 is IT, 4 is Software, 5 is Hardware 6 ish Manager',
                choices: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                ]
            }, 
        ])
        .then((answer) => {
            const query = 'INSERT INTO employeeRole SET?';
            connection.query(query,
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
        res.forEach(({first_name, last_name, role_id}) => {
            console.log(`FirstName: ${first_name} | LastName: ${last_name} | RoleId: ${role_id}`);
        });
        console.log('--------');
    });
        connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.log('\n');;
        console.log('----Departments----');
        res.forEach(({ name}) => {
            console.log(`DepartmentName: ${name}`);
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

const deleteEmployee = () => {
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
    connection.query(query,
        {
            first_name: answer.deletion,
        },
        (err) => {
           if (err) throw err;
           console.log(`deleted....`); 
           console.log('\n');
           start();
        });
    });
};

const updateRole = () => {
    console.log('Update employees role...\n');
    inquirer
    .prompt([
        {
            name: 'updateRoleId',
            type: 'list',
            message: 'What would you like to update their role to?',
            choices: [
                'Application Developer',
                'Cyber Security Analyst',
                'IT Specialist',
                'Software Developer',
                'Hardware Developer',
                'Manager',
                ]
        },
        {
           name: 'firstName',
           type: 'input',
           message: 'Type name of Employee you would like to update' 
        }
    ])
        .then((answer) => {
    const query = 'Update employee SET and WHERE?';
    connection.query(query,
        [
        {
            role_id: answer.updateRoleId,
        },
        {
            first_name: answer.firstName
        }
        ],
        (err) => {
            if (err) throw err;
            console.log(`update complete....`);
            console.log(`\n`);
            start();
        });
    });
};
