DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles(
    role_title VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    salary DECIMAL NOT NULL
);

DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);