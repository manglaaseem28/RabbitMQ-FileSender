const express = require("express");
const routes = require("./route/route");
const cors = require('cors');

require("dotenv").config();

const app = express();

const port = process.env.PORT_NUM || 3000;
// console.log(port)

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(port, () => console.log(`Server Started at Port ${port}`));

module.exports = app;
