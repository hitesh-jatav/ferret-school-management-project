const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeModel = new Schema({

    title: { type: String },
    description: { type: String },
    publishedOn: { type: Date },
    status: { type: Boolean, default: true },
    type: { type: String, enum: ['general', 'order', 'higherAuthority', 'result', ''] },
    school: { type: Schema.Types.ObjectId },
    creater: { type: Schema.Types.ObjectId },
});

module.exports = model.Schema('notice', NoticeModel);