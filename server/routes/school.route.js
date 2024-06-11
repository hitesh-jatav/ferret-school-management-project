const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/school.controller.js');

router.post('/', SchoolController.createSchool)


module.exports = router;