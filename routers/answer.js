const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer} = require('../controllers/answer');
const {checkAnswerOfQuestionExist} = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router({mergeParams:true});

router.post('/',getAccessToRoute, addNewAnswerToQuestion);
router.get('/', getAllAnswersByQuestion);
router.get('/:answers_id', checkAnswerOfQuestionExist ,getSingleAnswer);


module.exports = router;