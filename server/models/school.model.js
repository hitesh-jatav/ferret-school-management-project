const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schoolSchema = new Schema({
    name: { type: String },
    head: { type: Schema.Types.ObjectId },
    address: { type: String },
    email: { type: String },
    phone: { type: String },
    level: { type: String, enum: ['priamry', 'secondary', 'higherSecondary'] },
    modeOfEducation: { type: String },
    isActive: { type: Boolean, default: false },
});

module.exports = mongoose.model('school', schoolSchema);