INSERT INTO departments (department_name, department_id)
VALUES ("Restaraunt",   1),
       ("Clothing",     2),
       ("Pharmacy",     3),
       ("Electronics",  4),
       ("Accessories",  5),
       ("Pets",         6);

INSERT INTO roles (role_title, role_id, department_id, salary)
VALUES ("Server",           1,  1,  500),
       ("Stocker",          2,  2,  450),
       ("Chef",             3,  1,  750),
       ("Groomer",          4,  6,  800),
       ("Jeweler",          5,  5,  1000),
       ("Technician",       6,  4,  2500),
       ("Pharmacists",      7,  3,  6000),
       ("Geek Squad",       8,  4,  950),
       ("Tailor",           9,  2,  850),
       ("Animal Handler",   10, 6,  1200);

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id)
VALUES (001, "James",   "Lincoln",      1,  001),
       (002, "Tim",     "Tam",          2,  002),
       (003, "Jon",     "Jimbo",        7,  003),
       (004, "Zack",    "Zim",          10, 004),
       (005, "Lan",     "Limburger",    4,  005),
       (006, "Hal",     "Halloway",     5,  004),
       (007, "Vince",   "Val",          9,  002),
       (008, "Frank",   "Furt",         8,  001);