const express = require("express");
const routes = require("./route/route");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const app = express();

const port = process.env.PORT_NUM || 8000;
// console.log(port)

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(routes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb("null", "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.listen(port, () => console.log(`Server Started at Port ${port}`));

module.exports = app;
