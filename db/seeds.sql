INSERT INTO department(id, names)
VALUES (1, "department1"),
       (2, "department2"),
       (3, "department3"),
       (4, "department4"),
       (5, "department5");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "role1", 5.00, 001),
       (2, "role2", 10.00, 002),
       (3, "role3", 15.00, 003),
       (4, "role4", 20.00, 004),
       (5, "role5", 25.00, 005);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "James", "Lincoln", 1, 001),
       (2, "Tim", "Tam", 2, 002),
       (3, "Jon", "Jimbo", 3, 003),
       (4, "Zack", "Zim", 4, 004),
       (5, "Lan", "Limburger", 5, 005);