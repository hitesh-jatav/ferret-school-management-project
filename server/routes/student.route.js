const express = require('express')
const router = express.Router();
const StudentController = require('../controllers/student.controller')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-file', upload.single('file'), StudentController.readStudentFromXcel)
router.put('/:sid', StudentController.updateStudent)
router.get('/:sid', StudentController.getProfileInfo)
router.delete('/:sid', StudentController.removeStudent)
router.post('/', StudentController.addStudent)
router.get('/', StudentController.getStudents)


module.exports = router;