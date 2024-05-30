const express = require('express')
const router = express.Router();
const { verifyToken } = require('../helpers/middlewares')
const AuthController = require('../controllers/auth.controller')

router.get('/', verifyToken, AuthController.verifyUser)
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup)

module.exports = router;