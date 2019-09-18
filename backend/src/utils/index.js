const jwt = require('jsonwebtoken');

const JWT_SECRET = Date.now().toString();

const jwtSign = (data, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, options, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    });
  });
};

const jwtVerify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) reject(error);
      else resolve(decoded);
    });
  });
};

module.exports = {
  JWT_SECRET, jwtSign, jwtVerify
};