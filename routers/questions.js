const express = require('express');
const {askNewQuestion, getAllQuestions, getSingleQuestion} = require('../controllers/questions');
const{getAccessToRoute} = require ("../middlewares/authorization/auth");
const {checkQuestionExist} = require("../middlewares/database/databaseErrorHelpers");

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getSingleQuestion); //only get one questions
router.post("/ask", getAccessToRoute ,askNewQuestion);


module.exports = router;