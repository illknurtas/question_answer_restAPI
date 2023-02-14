const Questions = require ("../models/que");
const Answer = require ("../models/answer");
const CustomError = require ("../helpers/error/CustomError");
const asyncErrorWrapper = require ("express-async-handler");
const { response } = require("express");

const addNewAnswerToQuestion = asyncErrorWrapper(async(req, res, next)=>{

    const {question_id}= req.params;
    const user_id = req.user.id;
    const information = req.body;

    const answer = await Answer.create({
        ...information,
        question: question_id,
        user: user_id
    });
    return res.status(200).json({
        success:true,
        data: answer
    });
});

const getAllAnswersByQuestion = asyncErrorWrapper(async(req, res, next)=>{

    const {question_id}= req.params;
    const question = await Questions.findById(question_id);

    return res.status(200).json({
        success:true,
        data: answer
    });
});


module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion
};