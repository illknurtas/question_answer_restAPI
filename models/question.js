const mongoose = require ("mongoose");

const Schema = mongoose.Schema;
const QuestionSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, "Please provide a title"],
        minlength:[10,"Please provide a title at least 10 characters"],
        unique: true
    },
    content:{
        typeof: String,
        required:[true, "Please provide a content"],
        minlength:[20,"Please provide a content at least 10 characters"],
    },
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    }
});


// module.exports = mongoose.model("Question",QuestionSchema);