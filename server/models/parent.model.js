const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParentModel = new Schema({
    fname: { type: String },
    lname: { type: String },
    city: { type: String },
    dob: { type: Date },
    phone: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    email: { type: String },
    nationality: { type: String, default: 'Indian' },
    adhaarNumber: { type: String },
    firstLanguage: { type: String },
    parent: { type: String, enum: ['mother', 'father', 'brother', 'sister'] },
    studentId: { type: mongoose.Types.ObjectId, ref: 'student' },
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('parent', ParentModel);

