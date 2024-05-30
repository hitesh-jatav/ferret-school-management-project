const StudentModal = require('../models/student.model');

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
        let list = await StudentModal.find({});
        return res.status(200).send({ code: 200, list: list });
    } catch (error) {

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
        console.log('dsfdfs', req?.params?.sid, studentInfo);
        return res.status(200).send({ code: 200, info: studentInfo })
    } catch (err) {
        console.log('getProfileInfo', err)
    }
}

module.exports = {
    addStudent, getStudents, removeStudent, updateStudent, getProfileInfo
}