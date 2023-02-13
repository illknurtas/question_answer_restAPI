const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const questionSchema = new Schema({
    title:{
        type: String,
        required: [true,"Please enter a title"],
        minlenth:[10,"Please provide a title at least 10 characters length" ],
        unique: true
    },
    content:{
        type: String,
        required: [true,"Please enter a content"],
        minlenth:[20,"Please provide a content at least 10 characters length" ],
    },
    slug:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model ("Questions",questionSchema);