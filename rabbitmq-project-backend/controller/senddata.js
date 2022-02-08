const { executeQuery } = require("../service/db");

/**
 * Used to fetch file data from the database
 * @param {object} req
 * @param {object} res
 * @returns {object} returns the status and data
 */
const sendData = async (req, res) => {
  try {
    const options = {
      from: "taskdesc",
    };
    const data = await executeQuery("select", options);
    console.log(data);
    res.status(200).send(data.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendData };
