const express = require('express')
const router = express.Router();
const NoticeController = require('../controllers/notice.controller.js')

router.get('/', NoticeController.getNoticeLists);
router.post('/', NoticeController.addNotice);

module.exports = router;