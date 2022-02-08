const router = require("express").Router();
const multer = require("multer");
const processData = require("../controller/receivefile");
const { sendData } = require("../controller/senddata");

const {
  sendUserData,
  authenticateToken,
  refreshAccessToken,
  logout,
  authoriseUser,
} = require("../controller/template");
const {
  registerUser,
  getEmployes,
  authenticateUser,
} = require("../controller/user");
const app = require("../server");

const storage = multer.diskStorage({
  destination: "uploads/csv/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
  onFileUploadStart: function () {
    console.log("Upload is starting...");
  },
  onFileUploadComplete: function () {
    console.log("File uploaded");
  },
});

// Filter for CSV file
const csvFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.includes("csv") || file.mimetype.includes("vnd.ms-excel")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};
const upload = multer({ storage: storage });

// const upload = multer({dest:'tmp/csv/'});

router.get("/userData", authenticateToken, sendUserData);

router.post("/register", registerUser);

router.get("/alluser", getEmployes);

router.post("/login", authenticateUser, authoriseUser);

router.post("/token", refreshAccessToken);

router.post("/sendfile", upload.single("file"), processData);

router.delete("/logout", logout);

router.post("/senddata", sendData)

module.exports = router;
