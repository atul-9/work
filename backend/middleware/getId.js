const jwt = require("jsonwebtoken");
const secretKey = require("../config/config");

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  console.log(token);

  if (!token) {
    return res.status(401).send("Please authenticate using a valid token");
  }

  const key = secretKey.secretKey;
  console.log(key);

  try {
    const data = jwt.verify(token, key);
    req.userid = data;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send("Please authenticate using a valid token");
  }
};

module.exports = fetchuser;
