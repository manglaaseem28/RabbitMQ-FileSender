const Pool = require("pg").Pool;
const { dbConfig, RabbitMQConn } = require("../config/config");

const pool = new Pool(dbConfig);
console.log(RabbitMQConn);
// module.exports = pool;

const insertQuery = async (table, tableValues) => {
  try {
    let args = "";
    tableValues.map((s, i = 2) => {
      args += ",$" + `${i + 1}`;
    });
    await pool.query(
      `INSERT INTO ${table.table_name} (${table.schema}) VALUES(${args.slice(1)})`,
      tableValues
    );
    console.log(`Successfully Inserted data into ${table.table_name}`);
  } catch (exe) {
    console.error(exe);
  }
  // console.log(table, ...tableValues)
};

const selectQuery = async (table, values) =>{
    try {
        const returnData = await pool.query(`
        SELECT ${values} FROM ${table.table_name}
        `)
        // console.log('Data', returnData)
        return returnData;

    } catch (exe) {
        console.error(exe);
    }
}

module.exports = { insertQuery , selectQuery};
