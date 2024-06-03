const express = require('express')
const router = express.Router();
const parentController = require('../controllers/parent.controller.js')

router.post('/', parentController.addParent)
router.get('/', parentController.getParent)

module.exports = router;