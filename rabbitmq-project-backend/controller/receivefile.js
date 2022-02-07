const lineReader = require("line-reader");
const fs = require('fs');
const connectPublisher = require("../messagequeue/publisher");

const processData = async (req, res) => {
  console.log('Receive File');
    try {
      const csvPath = req.file.path
    var data = []
    // open uploaded file
    // lineReader.eachLine(csvPath, async (line, last, cb) => {
    //   console.log(line, last)
    //   // data.push(Buffer.from(line))
    //   // data.push(line)
    //   cb();
    // });// console.log('Received Data', data)
    const response = await connectPublisher(csvPath);
    if(response.status)
    res.sendStatus(200);
    else
    res.status(400).send('File Not Uploaded, Upload Again')
      
    } catch (error) {
      console.error('Receive File Error', error);
      res.status(500).send(error)
    }
  }

module.exports = processData
