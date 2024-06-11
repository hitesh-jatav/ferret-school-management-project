const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model.js');

const verifyToken = async (req, res, next) => {
  try {
    const authorizationData = req.headers['authorization'];
    if (!authorizationData) {
      return res.status(401).send({ status: 401, message: 'Unauthorized' });
    }
    const authObj = JSON.parse(authorizationData);
    const token = authObj.token;
    const userId = authObj.id;
    if (!token || !userId) {
      return res.status(401).send({ status: 401, message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.id !== userId) {
      return res.status(401).send({ status: 401, message: 'Unauthorized' });
    }
    const user = await UserModel.findOne({ _id: userId }).lean();
    if (!user) {
      return res.status(404).send({ status: 404, message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

module.exports = {
  verifyToken,
};
