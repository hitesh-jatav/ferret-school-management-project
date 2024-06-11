const express = require('express')
const router = express.Router();
const { verifyToken } = require('../helpers/middlewares')
const AuthController = require('../controllers/auth.controller')

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/school-signup', AuthController.schoolSignup); 
router.post('/verfiy-school', AuthController.verifySchool); 
router.post('/complete-school-signup', AuthController.completeSchoolSignup)

module.exports = router;