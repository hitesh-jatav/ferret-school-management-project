const StudentModal = require('../models/student.model');
const UserModel = require('../models/user.model.js')
const xlsx = require('xlsx');

const addStudent = async (req, res) => {
    try {
        await StudentModal(req.body).save()
        return res.status(200).send({ code: 200, message: 'Student Added Successfully!' });
    } catch (err) {
        console.error('addStudent', err)
    }
}

const getStudents = async (req, res) => {
    try {
        let filter = { school: req.user.school }
        if (req.query.word.trim()) {
            let word = req.query.word.trim().toLowerCase();
            filter = {
                school: req.user.school,
                $or: [
                    { fname: { $regex: new RegExp("^" + word, "i") } },
                    { lname: { $regex: new RegExp("^" + word, "i") } },
                    { email: { $regex: new RegExp("^" + word, "i") } },
                    { phone: { $regex: new RegExp("^" + word, "i") } },
                ]
            }
        }
        let students = await StudentModal.find(filter);
        return res.status(200).send({ code: 200, students });
    } catch (error) {
        console.error('getStudents', error)
    }
}

const removeStudent = async (req, res) => {
    try {
        await StudentModal.deleteOne({ _id: req.params.sid });
        return res.status(200).send({ code: 200, message: 'Student removed Successfully!' });
    } catch (error) {
        console.log('removeStudent', error)
    }
}

const updateStudent = async (req, res) => {
    try {
        console.log(req.body, req.params.sid);
        await StudentModal.updateOne({ _id: req.params.sid }, { $set: req.body });
        return res.status(200).send({ code: 200, message: 'Student Updated Successfully!' });
    } catch (error) {
        console.error('updateStudent', err)
    }
}

const getProfileInfo = async (req, res) => {
    try {
        let studentInfo = await StudentModal.findOne({ _id: req?.params?.sid })
        return res.status(200).send({ code: 200, info: studentInfo })
    } catch (err) {
        console.log('getProfileInfo', err)
    }
}


const readStudentFromXcel = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const workbook = xlsx.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(worksheet);
        const getGender = (gen) => {
            if (!gen) return 'unknown';
            if (gen.toLowerCase() === 'female' || gen.toLowerCase() === 'f') {
                return 'female';
            }
            return 'male';
        }

        for (const E of data) {
            let obj = {
                fname: E['First Name'] || E['first name'],
                lname: E['Last Name'] || E['last name'],
                phone: E['Phone'] || E['phone'],
                email: E['Email'] || E['email'],
                role: 'student',
                // school:
                gender: getGender(E['Gender']),
            }
            let user = await UserModel(obj).save();
            obj = {
                ...obj,
                class: E['Class'] || E['class'],
                grNo: E['Id'] || E['id'],
                userId: user._id
            }

            await StudentModal(obj).save();
        }


        res.status(200).json({ message: 'Students Added Successfully!' });
    } catch (err) {
        console.error('Error in readStudentFromXcel:', err); // Improved error logging
        res.status(500).send('An error occurred while processing the file.'); // Sending error response
    }
}



module.exports = {
    addStudent,
    getStudents,
    readStudentFromXcel,
    removeStudent,
    updateStudent,
    getProfileInfo
}