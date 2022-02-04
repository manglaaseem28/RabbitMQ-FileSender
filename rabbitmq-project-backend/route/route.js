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
const upload = multer({dest:'tmp/csv/'});

router.get("/userData", authenticateToken, sendUserData);

// Authentication

// Register an Employee--- ADD User
// router.post("/upload", function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });

router.post("/register", registerUser);

router.get("/alluser", getEmployes);

router.post("/login", authenticateUser, authoriseUser);

router.post("/token", refreshAccessToken);

router.post("/sendfile", upload.single('file'), processData)

router.delete("/logout", logout);

module.exports = router;
