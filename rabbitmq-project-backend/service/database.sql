CREATE DATABASE employee_database;

--\c into employee_databse

CREATE TABLE if not exists employee(
    employee_id serial PRIMARY KEY,
    employee_email VARCHAR(255) UNIQUE,
    employee_name VARCHAR(255),
    designation VARCHAR(60),
    password VARCHAR(100)
);
create table if not exists taskdesc(
Task_id integer primary key,
Task_Title varchar(100),
Task_description varchar(250)
);
create table if not exists taskdist(
Task_id integer REFERENCES taskdesc(Task_id),
Employee_id integer REFERENCES employee(Employee_id)
);

INSERT INTO employee (employee_name, designation, password) VALUES ('Aseem Mangla', 'Intern', 'aseem') returning *;