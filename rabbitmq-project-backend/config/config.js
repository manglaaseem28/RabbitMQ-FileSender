require("dotenv").config();

// const RabbitMQConn = `amqp://localhost:${process.env.RabbitMQ_PORT}`
const RabbitMQConn = `amqp://localhost:5672`;

const dbConfig = {
  host: "localhost",
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  user: "postgres",
  password: "351",
  port: 5432,
  database: "employee_database",
};

const employee = {
  table_name: "employee",
  schema: "employee_name, designation, password",
};

const task_desc = {
  table_name: "taskdesc",
  schema: "task_id,task_title,task_description",
};

const task_dist = {
  table_name: "taskdist",
  schema: "task_id,employee_id",
};
// console.log(dbConfig, RabbitMQConn)

module.exports = { RabbitMQConn, dbConfig, employee, task_desc, task_dist };
