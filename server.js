// Required Modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');

const figlet = require('figlet');
const cTable = require('console.table');

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
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
    }])
    .then(function(val) {
        // For future notes, 'val.action' is based on what inquirer where 'name:' is defined. If it was changed to another string it would be 'val.[w.e string]'
        switch (val.choice) {
            case ("View all Departments"):
                viewDepts();
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
                break
        }   
    })
};

// These next couple blocks are code are the different choices you can pick
// These are for viewing
// For 'View all Departments'
const viewDepts = () => {
    db.query("SELECT * FROM department", function (err, res) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table(res)
        startingPrompts()
    })
};
// For 'View all Roles'
const viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, res) {
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
    db.query('SELECT * FROM employees', function (err, res) {
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
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "What deparment are you adding?"
        }
    ])
    .then(function(res) {
        const query = "INSERT INTO department SET ?";
        
        // 'name' in this line of code is the title of the column in this name
        db.query(query, {name: res.Name},
            function(err) {
                if (err) throw err
                console.table(res);
                startingPrompts();
            }
        )
    })
};
// // For 'Add a Role'
const addRole = () => {
    const query = `SELECT roles.title, roles.salary FROM roles`;
    
    db.query(query, function(err, res) {
        
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the name of the Role?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is this role's Salary?"
            }
        ])

        .then(function(res) {
        // 'title' in this line of code is the title or the name of the columns in the tables
            db.query(
                "INSERT INTO roles SET ?", {
                    title: res.Title, 
                    salary: res.Salary
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startingPrompts();
                }
            )
        });

    });
};
// // For 'Add an Employee'
const addEmployee = () => {
    const query = `SELECT employees.first_name, employees.last_name`;

    db.query(query, function(err, res) {

        inquirer.prompt([
            {
                name: "First_name",
                type: "input",
                message: "What is the new employee's FIRST name?"
            },
            {
                name: "Last_name",
                type: "input",
                message: "What is the new employee's LAST name?"
            }
        ])

        .then(function(res) {
            db.query(
                "INSERT INTO employees SET ?", {
                    first_name: res.First_name,
                    last_name: res.Last_name
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    startingPrompts();
                }
            )
        });
        
    });
};


// // For 'Update Employee Role'
// const updateEmployee = () => {

// };


// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// //   });