const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    token: { type: String },
    expiryDate: { type: Date }
});

module.exports = mongoose.model('token', TokenModel);

