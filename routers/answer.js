const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer, editAnswer} = require('../controllers/answer');
const {checkAnswerOfQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
const {getAnswerOwnerAccess} = require ("../middlewares/authorization/auth");

const router = express.Router({mergeParams:true});

router.post('/',getAccessToRoute, addNewAnswerToQuestion);
router.get('/', getAllAnswersByQuestion);
router.get('/:answers_id', checkAnswerOfQuestionExist ,getSingleAnswer);
router.put('/:answers_id', [checkAnswerOfQuestionExist, getAccessToRoute ,getAnswerOwnerAccess] ,editAnswer);


module.exports = router;