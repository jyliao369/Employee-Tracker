const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Connecting to the database
// This block of code creates the connection between the server.js to the employee_db created in schema
// If it has sucessfully connected, WHICH REQUIRES A PASSWORD, the console log prints a confirmation
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'jliao5703', // Need to insert password here
        database: 'employee_db' // This pulls from the db created in the schema.sql
    },
    console.log('Connected to the employee_db database')
);

db.connect(function (err) {
    if (err) throw err
    console.log("Connected to MySql")
    startingPrompts();
});

// The next block of codes asks whether the user would to do one of these things:
// View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee?", "Update Employee Role?"
const startingPrompts = () => {
    return inquirer.prompt([{
        name: 'database',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
    }])
    .then(function(val) {
        switch (val.choice) {
            case "View all Departments":
                viewDepartments();
                break;
            
            case "View all roles":
                viewRoles();
                break;
            
            case "View all Employees":
                viewEmployees();
                break;

            case "Add a Department":
                addDepartment();
                break;

            case "Add a Role":
                addRole();
                break;

            case "Add an Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployee();
                break;
        }   
    })
};

// These next couple blocks are code are the different choices you can pick
// These are for viewing
// For 'View all Departments'
const viewDepartments = () => {
    db.query("SELECT * FROM department", function (err, query) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table("SELECT * FROM department")
        startingPrompts()
    })
};
// For 'View all Roles'
const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, res) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table(res)
        startingPrompts();
    })
};
// For 'View all Employees'
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, res) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table(res)
        startingPrompts();
    })
};

// These next couple blocks of code allo you to modify the such as add a department 
// employees, or roles
// For 'Add a Department'
const addDepartment = () => {
    inquirer.prompt([{
        name: "addDepartment",
        type: "input",
        message: "What deparment are you adding?"
    }])
    .then(function(res) {
        const query = connection.query(
            "", {
                name: res.name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startingPrompts();
            }
        )
    })
};
// For 'Add a Role'
const addRole = () => {

};
// For 'Add an Employee'
const addEmployee = () => {

};
// For 'Update Employee Role'
const updateEmployee = () => {

};


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });