const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    phone: { type: String },
    dob: { type: Date },
    city: { type: String },
    role: { type: String, enum: ['admin', 'principal', 'teacher', 'parent', 'student'] },
    password: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    isActive: { type: Boolean, default: false },
    school: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('user', UserSchema);