const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schoolSchema = new Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    level: { type: String, enum: ['primary', 'secondary', 'higherSecondary'] },
    head: { type: Schema.Types.ObjectId, ref: 'user' },
    modeOfEducation: { type: String },
    isActive: { type: Boolean, default: false },
});

module.exports = mongoose.model('school', schoolSchema);