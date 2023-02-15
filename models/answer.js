const mongoose = require('mongoose');
const Questions = require('./que');
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
answerSchema.pre("save", async function(next){

    if(!this.isModified("user")) return next();

    try{
        const question = await Questions.findById(this.question);
        question.answers.push(this._id);
        question.answersCount = question.answers.length;

        await question.save();
        next();
    }
    catch(err){
        return next(err);
    }

    
})

module.exports = mongoose.model("Answer",answerSchema);