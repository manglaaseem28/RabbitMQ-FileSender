const { randomBytes } = require("crypto")
const fs = require("fs")

// let writeStream = fs.createWriteStream('taskinfo.csv')
// writeStream.write(['Task_id', 'Task Title', 'Task description'] + '\n')
// for(var i=0;i<50;i++) {
//     let newLine = [i,`This is Task no. ${i+1}`, `This is task description`]
//     writeStream.write(newLine + '\n')   
// }

let writeStream = fs.createWriteStream('taskdestribution.csv')
writeStream.write(['Task_id', 'Employee_id'] + '\n')
for(var i=0;i<50;i++) {
    writeStream.write([i, Math.floor(Math.random() * (5-1) + 1)] + '\n')
}

writeStream.end();

writeStream.on('finish', () => {
    console.log('Finish Write Stream')
}).on('error', (err) => {
    console.error(err)
})