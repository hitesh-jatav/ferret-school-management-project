const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    isbn: { type: String },
    title: { type: String },
    publishedYear: { type: String },
    language: { type: String },
    category: { type: String },
    totalCopies: { type: Number },
    availableCopies: { type: Number },
    authors: { type: String },
});


module.exports = mongoose.model('book', BookSchema);