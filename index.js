const inquirer = require('inquirer');
const { start } = require('repl');
const connection = require('./config/connect');


connection.connect((err) => {
    if (err) throw err;
    start();
});