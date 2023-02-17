const CustomError = require ("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Questions = require("../models/que");
const {request} = require ("request");

const askNewQuestion = asyncErrorWrapper( async(req, res, next)=>{
    const information = req.body;
    console.log(information);
    const question = await Questions.create({
        title:information.title,
        content:information.content,
        user: req.user.id
    });
    res.status(200)
    .json({
        success: true,
        data: question
    });
});

// ALL QUESTIONS
const getAllQuestions = asyncErrorWrapper( async(req, res, next)=>{
    
    return res.status(200).json(
        res.queryResults
    );
});

// ONLY ONE QUESTION
const getSingleQuestion = asyncErrorWrapper( async(req, res, next)=>{
    const {id} = req.params;
    const question = await Questions.findById(id);
    console.log(question);
    return res.status(200).json({
        success: true,
        data: question
    });
});

// QUESTION EDIT
const editQuestion = asyncErrorWrapper( async(req, res, next)=>{
    const {id} = req.params;
    const {title, content} = req.body;

    let question = await Questions.findById(id);
    question.title = title;
    question.content = content;

    question = await Questions.save();

    return res.status(200).json({
        success : true,
        data: question
    });
});

// DELETE QUESTIONS
const deleteQuestion = asyncErrorWrapper( async(req, res, next)=>{
    const {id} = req.params;
   
    await Questions.findByIdAndDelete(id);

    return res.status(200).json({
        success : true,
        message:"Question deleted successfully"
    });
});

// LIKE QUESTIONS
const likeQuestion = asyncErrorWrapper( async(req, res, next)=>{
    const {id} = req.params;
    const question = await Questions.findById(id);

    if(question.likes.includes(req.user.id)){
        return next(
            new CustomError("You already liked this question",400)
        );
    }
    question.likes.push(req.user.id);
    question.likeCount = question.likes.length;

    await question.save();
    return res.status(200).json({
        success : true,
        data: question
    });
});

// DISLIKE QUESTIONS
const dislikeQuestion = asyncErrorWrapper( async(req, res, next)=>{
    const {id} = req.params;
    const question = await Questions.findById(id);

    if(!question.likes.includes(req.user.id)){
        return next(
            new CustomError("You cannot undo like operation for this question",400)
        );
    }
    
    const index= question.likes.indexOf(req.user.id);
    question.likes.splice(index, 1);
    question.likeCount = question.likes.length;

    await question.save();
    return res.status(200).json({
        success : true,
        data: question
    });
});


module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    dislikeQuestion
}