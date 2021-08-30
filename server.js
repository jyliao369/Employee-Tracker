// Required Modules
const mysql = require('mysql2');
const inquirer = require('inquirer');

const figlet = require('figlet');
const cTable = require('console.table');
const e = require('express');


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
    return inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all Departments', 
                      'View all roles', 
                      'View all Employees', 
                      'Add a Department', 
                      'Add a Role', 
                      'Add an Employee', 
                      'Update Employee Role'],
        },
    ]).then((data) => {
        // For future notes, 'val.action' is based on what inquirer where 'name:' is defined. If it was changed to another string it would be 'val.[w.e string]'
        switch (data.choice) {
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
                break;
        }   
    });
};

// These next couple blocks are code are the different choices you can pick
// These are for viewing
// For 'View all Departments'
const viewDepts = () => {
    const query = "SELECT * FROM department";
    db.query(query, function (err, res) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table(res)
        startingPrompts()
    });
};
// For 'View all Roles'
const viewRoles = () => {
    const query = "SELECT * FROM role";
    db.query(query, function (err, res) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table(res)
        startingPrompts();
    });
};
// // For 'View all Employees'
// // View all employees is going to be hard as i have to combine two different tables to 
// // form a single table. 
const viewEmployees = () => {
    const query = `SELECT 
                   employee.id, 
                   employee.first_name, 
                   employee.last_name, role.title, 
                   department.name AS department, 
                   role.salary, 
                   CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                   FROM 
                   employee
                   LEFT JOIN role ON employee.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id
                   LEFT JOIN employee manager ON manager.id = employee.manager_id;`;

    db.query(query, function (err, res) {
        // This basically states that if there was an error in the roles
        // Like if there was no data then we start over back at the prompts
        // asking the user what they would like to do next.
        if (err) throw err
        console.table(res)
        startingPrompts();
    });
};

// // These next couple blocks of code allo you to modify the such as add a department 
// // employees, or roles
// // For 'Add a Department'
// The parameters needed for this function are NAME OF DEPARTMENT
const addDepartment = () => {
    inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: "What's the name of the department are you adding?"
        },
    ])
    .then(function(res) {
        const query = "INSERT INTO department SET ?";
        // 'name' in this line of code is the title of the column in this name
        db.query(query, {
            name: res.Name
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startingPrompts();
            }
        );
    });
};

// // For 'Add a Role'
// // The parameters needed for this function are NAME OF ROLE, SALARY, DEPARTMENT FOR THE ROLE
const addRole = () => {
    
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
        },
    ])
    .then(function(res) {
    // 'title' in this line of code is the title or the name of the columns in the tables
        db.query(
            "INSERT INTO role SET ?", 
            {
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
};

// // // // For 'Add an Employee'
// // The parameters needed for this function are FIRST AND LAST NAME, ROLE AND MANAGER THEY WORK UNDER
const addEmployee = () => {

    let managersArray = [];
    let rolesArray = [];

    
    const query = "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL";
    db.query(
        "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", 
        (err, results) => {
            results.map(manager => 
                managersArray.push(`${manager.first_name} ${manager.last_name}`)
            );
            return managersArray;
        }
    );

    db.query("SELECT * FROM role ", (err, results) => {
        if (err) throw err;
        results.map(role => rolesArray.push(`${role.title}`));
        return rolesArray;
    })
    
    inquirer.prompt([
        {
            name: "First_name",
            type: "input",
            message: "What is the new employee's FIRST name?",
        },
        {
            name: "Last_name",
            type: "input",
            message: "What is the new employee's LAST name?",
        },
        {
            name: "Role",
            type: "list",
            message: "What is the employee's role?",
            choices: rolesArray,
        },
        {
            name: "Manager",
            type: "list",
            message: "Who is the Employee's manager?",
            choices: managersArray,
        }
    ]).then(function(res) {
        const roleID = rolesArray.indexOf(res.Role) + 1;
        const managerID = managersArray.indexOf(res.Manager) + 1;

        const newEmployee = {
            first_name: res.First_name,
            last_name: res.Last_name,
            manager_id: managerID,
            role_id: roleID,
        };

        db.query("INSERT INTO employee SET ?", newEmployee, err => {
            if (err) throw err;
            startingPrompts();
        })
    })
};


// For 'Update Employee Role'
const updateEmployee = () => {
    let employeeArr = [];
    let roleArr = [];
    
    // This code helps gather all of the employees. It grabs the first and last name
    // of every employer since everyone is an employee
    db.query(
      "SELECT first_name, last_name FROM employee",
      (err, results) => {
        results.map(employee =>
          employeeArr.push(`${employee.first_name} ${employee.last_name}`)
        );
        return employeeArr;
      }
    );
    
    // This block of is very similar to one up where we add a new employee
    // It basically grabs everyrole in the roles table and turns it into an array
    db.query(
      "SELECT * FROM role ", (err, results) => {
      if (err) throw err;
      results.map(role => roleArr.push(`${role.title}`));
      return roleArr;
    })

    inquirer.prompt([
        {
            name: "test-list",
            type: "list",
            message: "test",
            choices: [1, 2, 3, 4, 5], 
        },
        {
          name: "selection",
          type: "list",
          message: "Please select the employee to update",
          choices: employeeArr,
        },
        {
            name: "role",
            type: "list",
            message: "what is the employee's new role?",
            choices: roleArr,
        },
    ]).then(res =>{
        const role_id = roleArr.indexOf(res.role) + 1;
        const employee_id = employeeArr.indexOf(res.selection) + 1;
        console.log(role_id);
        console.log(employee_id);
        
        db.query (`UPDATE employee SET role_id= ${role_id} WHERE id= ${employee_id} `, (err) =>{
          if(err) throw err;
          startingPrompts();
        })
    })
};

