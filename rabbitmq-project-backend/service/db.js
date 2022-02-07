const Pool = require("pg").Pool;
const { dbConfig, RabbitMQConn } = require("../config/config");
const {select, insert} = require('./mysqlMapper')

const pool = new Pool(dbConfig);
// console.log(RabbitMQConn);

const executeQuery = async (query, options) => {
  var sql = "";
  try {
    switch (query) {
      case "select":
        sql = select(options);
        break;
      case "insert":
        sql = insert(options);
        break;
      default:
        console.error("No Query Options");
        break;
    }
    const result = await pool.query(sql);
    // console.log(result)
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = { executeQuery };
