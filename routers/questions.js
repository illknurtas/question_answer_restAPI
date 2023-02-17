const express = require('express');
const {askNewQuestion, getAllQuestions, getSingleQuestion, 
    editQuestion, deleteQuestion, likeQuestion, dislikeQuestion} = require('../controllers/questions');
const{getAccessToRoute, getQuestionOwnerAccess} = require ("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
const answer = require("./answer");
const questionQueryMw = require ("../middlewares/query/questionQueryMw");
const Questions = require("../models/que");
const answerQueryMw = require("../middlewares/query/answerQueryMw");

const router = express.Router();

router.get("/", questionQueryMw(
    Questions, {
        path: "user",
        select:"name profile_img"
    }
), getAllQuestions);
router.get("/:id", checkQuestionExist, answerQueryMw(
    Questions, {
        population: [
            {
                path: "user",
                select:"name profile_img"
            },
            {
                path: "answers",
                select:"content"
            }
        ]
    }), getSingleQuestion); //only get one questions
router.post("/ask", getAccessToRoute ,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute, checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute, checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
router.get("/:id/like",[getAccessToRoute, checkQuestionExist],likeQuestion);
router.get("/:id/dislike",[getAccessToRoute, checkQuestionExist],dislikeQuestion);

// ANSWER
router.use("/:question_id/answers", checkQuestionExist, answer);

// api/:id/answers

module.exports = router;