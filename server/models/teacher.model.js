const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeacherSchema = new Schema({
    fname: { type: String },
    lname: { type: String },
    city: { type: String },
    joinDate: { type: Date },
    leavingDate: { type: Date },
    dob: { type: Date },
    phone: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    email: { type: String },
    nationality: { type: String, default: 'Indian' },
    adhaarNumber: { type: String },
    firstLanguage: { type: String },
    experience: [
        {
            school: { type: String },
            started: { type: Date },
            ended: { type: Date },
            post: { type: String },
            city: { type: String }
        }
    ],
    school: { type: mongoose.Types.ObjectId, ref: 'school' },
    class: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    hobbies: { type: Array },
    grNo: { type: Number },
});

module.exports = mongoose.model('teacher', TeacherSchema);

