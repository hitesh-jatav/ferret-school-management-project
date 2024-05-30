// Middleware to verify JWT token
// const jwt 
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const authorizationData = req.headers['authorization'];
    let authObj = JSON.parse(authorizationData)
    let token = authObj.token;
    let userId = authObj.id;
    if (!token) {
      return res.send({ status: 401, message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.id !== userId) return res.send({ status: 401, message: 'Unauthorized' });
    else next();

  } catch (err) {
    return res.status(400).send('Invalid token');
  }
}

module.exports = {
  verifyToken,
}