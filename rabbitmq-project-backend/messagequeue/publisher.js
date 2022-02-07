const lineReader = require("line-reader");
const amqp = require("amqplib");
const { RabbitMQConn } = require("../config/config");

const connectPublisher = async (csvPath) => {
  try {
    const connection = await amqp.connect(RabbitMQConn);
    const channel = await connection.createChannel();
    await channel.assertQueue("taskdescription");
    

    // const csvFile1 = "../data/taskfiles/taskdescription.csv";

    lineReader.eachLine(csvPath, async (line, last, cb) => {
      // console.log(line, last)
      channel.sendToQueue("taskdescription", Buffer.from(line), {
        persistent: true,
      });
      cb();
    });

    // await channel.assertQueue("taskdistribution");

    // const csvFile2 = "../data/taskfiles/taskdistribution.csv";
    // lineReader.eachLine(csvFile2, async (line, last, cb) => {
    //   // console.log(line, last)
    //   channel.sendToQueue("taskdistribution", Buffer.from(line), {
    //     persistent: true,
    //   });
    //   cb();
    // });

    console.log(`Job sent successfully`);
    return {status:true}
  } catch (exception) {
    console.log('Publisher Exception', exception);
    return {status: false, error: exception}
  }
};

module.exports = connectPublisher
