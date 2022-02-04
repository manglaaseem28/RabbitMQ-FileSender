const router = require("express").Router();
const multer = require('multer');
const processData = require("../controller/receivefile");

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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, __basedir + '/uploads/')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//   }
// });

// // Filter for CSV file
// const csvFilter = (req, file, cb) => {
//   if (file.mimetype.includes("csv")) {
//       cb(null, true);
//   } else {
//       cb("Please upload only csv file.", false);
//   }
// };
// const upload = multer({ storage: storage, fileFilter: csvFilter });

const upload = multer({dest:'tmp/csv/'});

router.get("/userData", authenticateToken, sendUserData);

router.post("/register", registerUser);

router.get("/alluser", getEmployes);

router.post("/login", authenticateUser, authoriseUser);

router.post("/token", refreshAccessToken);

router.post("/sendfile", upload.single('file'), processData)

router.delete("/logout", logout);

module.exports = router;
