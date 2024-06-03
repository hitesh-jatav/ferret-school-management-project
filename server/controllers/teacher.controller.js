const TeacherModel = require('../models/teacher.model.js');
const UserModel = require('../models/user.model.js');

const getTeachers = async (req, res) => {
    try {
        let filter = {}
        if (req.query.word.trim()) {
            let word = req.query.word.trim().toLowerCase();
            filter = {
                $or: [
                    { fname: { $regex: new RegExp("^" + word, "i") } },
                    { lname: { $regex: new RegExp("^" + word, "i") } },
                    { email: { $regex: new RegExp("^" + word, "i") } },
                    { phone: { $regex: new RegExp("^" + word, "i") } },
                ]
            }
        }
        let teachers = await TeacherModel.find(filter);
        return res.status(200).json({ teachers });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}

const addTeacher = async (req, res) => {
    try {
        const { fname, lname, email, phone } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const newUser = new UserModel({
            fname,
            lname,
            email,
            phone,
            role: 'teacher'
        });

        await newUser.save();

        const newTeacher = new TeacherModel({
            userId: newUser._id,
            fname,
            lname,
            email,
            phone
        });

        let teacher = await newTeacher.save();

        return res.status(201).json({ message: 'Teacher added successfully', teacher });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addTeacher,
    getTeachers
};
