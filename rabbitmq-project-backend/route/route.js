const router = require("express").Router();

const {
  sendUserData,
  authenticateUser,
  authenticateToken,
  refreshAccessToken,
  logout,
} = require("../controller/template");
const { addUser, getEmployes } = require("../controller/user");
const app = require("../server");

router.get("/userData", authenticateToken, sendUserData);

// Authentication

// Register an Employee--- ADD User

router.post("/adduser", addUser);

router.get("/alluser", getEmployes);

router.post("/login", authenticateUser);

router.post("/token", refreshAccessToken);

router.delete("/logout", logout);

module.exports = router;
