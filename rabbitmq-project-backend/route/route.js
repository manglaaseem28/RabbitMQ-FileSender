const router = require("express").Router();

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

router.get("/userData", authenticateToken, sendUserData);

// Authentication

// Register an Employee--- ADD User

router.post("/register", registerUser);

router.get("/alluser", getEmployes);

router.post("/login", authenticateUser, authoriseUser);

router.post("/token", refreshAccessToken);

router.delete("/logout", logout);

module.exports = router;
