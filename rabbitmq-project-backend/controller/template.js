const jwt = require("jsonwebtoken");

let refreshTokens = [];

const sendUserData = (req, res) => {
  const response = userData.filter((user) => user.name == req.user.name);
  res.json(
    `Welcome ${response[0].name}, ${response[0].designation} at Truminds`
  );
};

// Authentication

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

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

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

module.exports = {
  sendUserData,
  addUser,
  authoriseUser,
  authenticateToken,
  refreshAccessToken,
  logout,
};
