const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Connecting to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '', // Need to insert password here
        database: 'tracker_db'
    },
    console.log('Connected to the tracker_db database')
);

// The next block of codes asks whether the user would to do one of these things:
// View All Departments?", "View All Roles?", "View All Employees?", "Add Department?", "Add Role?", "Add Employee?", "Update Employee Role?"
const startingPrompts = () => {
    return inquire.prompt([{
        name: 'databases',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'View all roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
    }])
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });