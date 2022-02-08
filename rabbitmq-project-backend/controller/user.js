// Register an Employee--- ADD User
const { executeQuery } = require("../service/db");

/**
 * Used to authenticate user credentials by running select query
 * @param {object} req
 * @param {object} res
 * @returns {object} tells the status of the user
 */
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
    } else {
      // res.json({error:'Invalid Credentials'})
      return res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

const registerUser = async (req, res) => {
  try {
    const user = `'${req.body.name}', '${req.body.email}','${req.body.designation}', '${req.body.password}'`;

    const options = {
      table: "employee",
      columns: "employee_name , employee_email, designation, password",
      values: user,
    };
    const result = await executeQuery("insert", options);
    console.log("Query Result", result);
    if (result && result.command === "INSERT") {
      res.status(200).send("Successfully Registered");
    } else {
      res.status(406).send(result);
    }
  } catch (err) {
    console.log(err);
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
