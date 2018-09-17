const jwt = require('jsonwebtoken');

const config = require('../../config/secret');

module.exports = (req, res, next) => {
 try {
  const decoded = jwt.decode(req.body.token, config.jwt_key);
  req.userData = decoded;
  console.log(decoded);
  next();
 } catch (error) {
  console.log(error)
  return res.status(401).json({
   message: 'Auth failed!'
  });
 }
};