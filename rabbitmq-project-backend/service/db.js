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
  }
};

// const insertQuery = async (table, tableValues) => {
//   try {
//     let args = "";
//     tableValues.map((s, i = 2) => {
//       args += ",$" + `${i + 1}`;
//     });
//     await pool.query(
//       `INSERT INTO ${table.table_name} (${table.schema}) VALUES(${args.slice(1)})`,
//       tableValues
//     );
//     console.log(`Successfully Inserted data into ${table.table_name}`);
//   } catch (exe) {
//     console.error(exe);
//   }
//   // console.log(table, ...tableValues)
// };

// const selectQuery = async (table, values) =>{
//     try {
//         const returnData = await pool.query(`
//         SELECT ${values} FROM ${table.table_name}
//         `)
//         // console.log('Data', returnData)
//         return returnData;

//     } catch (exe) {
//         console.error(exe);
//     }
// }

module.exports = { executeQuery };
