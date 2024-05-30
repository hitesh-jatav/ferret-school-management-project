const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema = new Schema({
    fname: { type: String },
    lname: { type: String },
    class: { type: String },
    city: { type: String },
    dob: { type: Date },
    joinDate: { type: Date },
    gender: { type: String, enum: ["male", "female"] },
    hobbies: { type: Array },
    phone: { type: String },
    email: { type: String },
    nationality: { type: String, default: 'Indian' },
    ahaarNumber: { type: String },
    grNo: { type: Number },
    firstLanguage: { type: String }
});

module.exports = mongoose.model('student', StudentSchema);

