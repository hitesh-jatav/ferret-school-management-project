const express = require('express')
const router = express.Router();
const { verifyToken } = require('../helpers/middlewares')
const NoticeController = require('../controllers/notice.controller.js')

router.use('/authentication', require('./authentication.route.js'));

router.get('/notice', verifyToken, NoticeController.getNoticeLists);
router.post('/notice', verifyToken, NoticeController.addNotice);
router.use('/dashboard', verifyToken, require('./dashboard.route.js'));
router.use('/user', verifyToken, require('./user.route.js'));
router.use('/student', verifyToken, require('./student.route.js'));
router.use('/notice', verifyToken, require('./notice.route.js'));

module.exports = router;