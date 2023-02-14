const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content:{
        type: String,
        required:[true,"Please provide a content"],
        minlength: [10, "Please provide at least 10 characters"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    likes:[{
        type: mongoose.Schema.ObjectId,
        ref:"User"
    }],
    user:[{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    }],
    question:{
        type: mongoose.Schema.ObjectId,
        ref:"Question",
        required: true
    }

});

module.exports = model.mongoose("Answer",answerSchema);