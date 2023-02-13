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

    const questions = await Questions.find();
    return res.status(200).json({
        success: true,
        data: questions
    });
});
module.exports = {
    askNewQuestion,
    getAllQuestions
}