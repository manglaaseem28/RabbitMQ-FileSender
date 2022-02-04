const lineReader = require("line-reader");
const fs = require('fs');
const connectPublisher = require("../messagequeue/publisher");

const processData = async (req, res) => {
    try {
      const csvPath = req.file.path
    // var data = []
    // // open uploaded file
    // lineReader.eachLine(csvPath, async (line, last, cb) => {
    //   // console.log(line, last)
    //   // data.push(Buffer.from(line))
    //   // data = [...data, line]
    //   // json.send(l)
    //   // console.log('data',data)
    //   cb();
    // });
    connectPublisher(csvPath)
    // console.log('Received Data', data)
    // // res.json(JSON.stringify(data));
    // res.json(data)
    res.sendStatus(200);
      
    } catch (error) {
      console.error(error);
    }
  }

module.exports = processData
