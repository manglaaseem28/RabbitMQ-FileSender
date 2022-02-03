const lineReader = require("line-reader");
const amqp = require("amqplib");
const { RabbitMQConn } = require("../config/config");

// const msg = {number: process.argv[2]}

const connect = async () => {
  try {
    const connection = await amqp.connect(RabbitMQConn);
    const channel = await connection.createChannel();
    await channel.assertQueue("taskdescription");

    const csvFile1 = "../data/taskfiles/taskdescription.csv";
    lineReader.eachLine(csvFile1, async (line, last, cb) => {
      // console.log(line, last)
      channel.sendToQueue("taskdescription", Buffer.from(line), {
        persistent: true,
      });
      cb();
    });

    await channel.assertQueue("taskdistribution");

    const csvFile2 = "../data/taskfiles/taskdistribution.csv";
    lineReader.eachLine(csvFile2, async (line, last, cb) => {
      // console.log(line, last)
      channel.sendToQueue("taskdistribution", Buffer.from(line), {
        persistent: true,
      });
      cb();
    });

    console.log(`Job sent successfully`);
  } catch (exception) {
    console.log(exception);
  }
};

connect();
