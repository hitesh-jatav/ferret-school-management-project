const express = require('express')
const router = express.Router();
const teacherController = require('../controllers/teacher.controller.js')


router.post('/', teacherController.addTeacher)
router.get('/', teacherController.getTeachers)

module.exports = router;