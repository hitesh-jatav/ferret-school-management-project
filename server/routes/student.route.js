const express = require('express')
const router = express.Router();
const StudentController = require('../controllers/student.controller')

router.put('/:sid', StudentController.updateStudent)
router.get('/:sid', StudentController.getProfileInfo)
router.delete('/:sid', StudentController.removeStudent)
router.post('/', StudentController.addStudent)
router.get('/', StudentController.getStudents)


module.exports = router;