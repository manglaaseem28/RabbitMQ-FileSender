// Register an Employee--- ADD User
const { executeQuery } = require("../service/db");

const authenticateUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = { name: email, password: password };
    const options = {
      from: "employee",
      count: "*",
      conditions: `employee_email='${email}' AND password='${password}'`,
    };
    const result = await executeQuery("select", options);
    
    if (result.rows[0].count == "1") {
      console.log("Authentication Successful");
      req.user = user;
      next();
    } else{
      res.send('Details Not Matched')
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const registerUser = async (req, res) => {
  try {
    const user = `'${req.body.name}', '${req.body.email}','${req.body.designation}', '${req.body.password}'`
    
    const options = {
      table: "employee",
      columns: 'employee_name , employee_email, designation, password',
      values: user
    };
    const result = executeQuery('insert', options);
    // console.log(result)
    res.json("Successfully Registered!")
    res.sendStatus(200).send();
  } catch (err) {
    console.log(err.message);
  }
};

const getEmployes = async (req, res) => {
  try {
    const options = {
      columns: "employee_name, designation",
      from: "employee",
    };
    const allEmployees = await executeQuery("select", options);
    console.log(allEmployees);
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { registerUser, getEmployes, authenticateUser };
