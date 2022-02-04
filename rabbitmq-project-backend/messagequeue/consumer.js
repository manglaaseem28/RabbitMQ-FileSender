const amqp = require("amqplib");
require("dotenv").config();

const { RabbitMQConn, task_desc, task_dist } = require("../config/config");

const { insertQuery } = require("../service/db");

console.log(RabbitMQConn);
const connect = async () => {
  try {
    console.log("Start Reading");

    const connection = await amqp.connect(RabbitMQConn);
    const channel = await connection.createChannel();

    // task description
    await channel.assertQueue("taskdescription");
    // channel.prefetch(1);

    await channel.consume("taskdescription", async (message) => {
      const taskdesc = message.content.toString().split(",");
      if (taskdesc[0] == "Task_id") {
        channel.ack(message);
      } else {
        console.log(taskdesc)
        // await insertTaskDescription(
        //   parseInt(taskdesc[0]),
        //   taskdesc[1],
        //   taskdesc[2]
        // );
        channel.ack(message);
      }
    });

    // task distribution

    // await channel.assertQueue("taskdistribution");
    // // channel.prefetch(1);

    // await channel.consume("taskdistribution", async (message) => {
    //   const taskdesc = message.content.toString().split(",");
    //   if (taskdesc[0] == "Task_id") {
    //     channel.ack(message);
    //   } else {
    //     // console.log(taskdesc)
    //     await insertTaskDistribution(
    //       parseInt(taskdesc[0]),
    //       parseInt(taskdesc[1])
    //     );
    //     channel.ack(message);
    //   }
    // });

    console.log(`Waiting for Message.....`);
  } catch (exception) {
    console.log(exception);
  }
};

connect();

const insertTaskDescription = async (task_id, taskTitle, taskDescription) => {
  try {
    await insertQuery(task_desc, [task_id, taskTitle, taskDescription]);
  } catch (exe) {
    console.error(exe);
  }
};

const insertTaskDistribution = async (task_id, employee_id) => {
  try {
    await insertQuery(task_dist, [task_id, employee_id]);
  } catch (exe) {
    console.error(exe);
  }
};
