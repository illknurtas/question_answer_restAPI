const express = require('express');
const {askNewQuestion, getAllQuestions} = require('../controllers/questions');
const{getAccessToRoute} = require ("../middlewares/authorization/auth");

const router = express.Router();

router.get("/", getAllQuestions);
router.post("/ask", getAccessToRoute ,askNewQuestion);


module.exports = router;