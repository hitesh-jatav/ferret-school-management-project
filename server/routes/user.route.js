const express = require('express')
const router = express.Router();
const ProfileController = require('../controllers/profile.controller')

router.post('/:id', ProfileController.updateProfileInfo)
router.get('/:id', ProfileController.profileInfo)

module.exports = router;