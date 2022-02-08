const jwt = require("jsonwebtoken");
const multer = require("multer");

let refreshTokens = [];

const sendUserData = (req, res) => {
  const response = userData.filter((user) => user.name == req.user.name);
  res.json(
    `Welcome ${response[0].name}, ${response[0].designation} at Truminds`
  );
};

// Authentication

/**
 * Used to register user credentials into database
 * @param {object} req
 * @param {object} res
 * @returns {object} returns the status of the entity
 */

const addUser = (req, res) => {
  const user = {
    name: req.body.name,
    designation: req.body.designation,
    password: req.body.password,
  };
  userData.push(user);
  res.json(userData);
  res.status(200).send();
};

/**
 * Used to generate JWT Token for user
 * @param {object} user
 *
 * @returns {object} returns the token
 */

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

/**
 * used to authorize user by sending access & refresh tokens in header
 * @param {object} req
 * @param {object} res
 * @returns {JSON} returns the access and refresh tokens
 */

const authoriseUser = (req, res) => {
  try {
    const accessToken = generateAccessToken(req.user);
    const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(403);
  }
};

/**
 * Used to verify whether signed user is accessing other routes
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} tells the status whether user is valid or not
 */

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

/**
 * Used to generate  a new access token after it expires
 * @param {object} req
 * @param {object} res
 * @returns {JSON} returns new access token or any error with status code
 */

const refreshAccessToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
};

const logout = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

// const upload =
//   (req,
//   res,
//   function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
module.exports = {
  sendUserData,
  addUser,
  authoriseUser,
  authenticateToken,
  refreshAccessToken,
  logout,
};
