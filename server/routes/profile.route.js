const express = require('express')
const router = express.Router();
const upload = require('../configs/upload.config.js')
const ProfileController = require('../controllers/profile.controller.js')

router.get('/overview/:id', ProfileController.profileInfo)
router.post('/upload-pic/:id', upload.single('file'), ProfileController.uploadProfile)
router.delete('/upload-pic/:id', upload.single('file'), ProfileController.deleteProfilePic)

module.exports = router;