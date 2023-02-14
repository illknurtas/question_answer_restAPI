const User = require("../../models/user");
const Questions = require("../../models/que");
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../../helpers/error/CustomError');
const user = require("../../models/user");


const checkUserExist = asyncErrorWrapper(async(req, res, next)=>{
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user){
        return next(
            new CustomError(
                "There is no such user with that ID!", 400
                )
            );
        }
    next();
});


const checkQuestionExist = asyncErrorWrapper(async(req, res, next)=>{
   
    const question_id  = req.params.id || req.params.question_id;
    const question = await Questions.findById(question_id);

    if (!question){
        return next(
            new CustomError("There is no such question with that Id",400)
        );
    };
});


module.exports = {
    checkUserExist,
    checkQuestionExist
}