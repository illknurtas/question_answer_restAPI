const express = require('express');
const {askNewQuestion, getAllQuestions, getSingleQuestion, 
    editQuestion, deleteQuestion, likeQuestion, dislikeQuestion} = require('../controllers/questions');
const{getAccessToRoute, getQuestionOwnerAccess} = require ("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");
const answer = require("./answer");

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion); //only get one questions
router.post("/ask", getAccessToRoute ,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute, checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute, checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
router.get("/:id/like",[getAccessToRoute, checkQuestionExist],likeQuestion);
router.get("/:id/dislike",[getAccessToRoute, checkQuestionExist],dislikeQuestion);

// ANSWER
router.use("/:id/answers", checkQuestionExist, answer);

// api/:id/answers

module.exports = router;