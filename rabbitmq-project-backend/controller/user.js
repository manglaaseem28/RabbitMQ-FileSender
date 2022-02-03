// Register an Employee--- ADD User

const { employee } = require("../config/config");
const { insertQuery, selectQuery } = require("../service/db");

const addUser = async (req, res) => {
  try {
    const user = [req.body.name, req.body.designation, req.body.password];
    const newEmployee = insertQuery(employee, user);

    // res.json("Successfully Registered!")
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
  }
};

const getEmployes = async (req, res) => {
  try {
    const getValues = 'employee_name, designation'
    const allEmployees = await selectQuery(employee, getValues)
    // console.log(allEmployees)
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { addUser, getEmployes };
