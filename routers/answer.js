const express = require('express');
const {getAccessToRoute} = require('../middlewares/authorization/auth');
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer, editAnswer,deleteAnswer
, likeAnswer, dislikeAnswer} = require('../controllers/answer');
const {checkAnswerOfQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
const {getAnswerOwnerAccess} = require ("../middlewares/authorization/auth");

const router = express.Router({mergeParams:true});

router.post('/',getAccessToRoute, addNewAnswerToQuestion);
router.get('/', getAllAnswersByQuestion);
router.get('/:answers_id', checkAnswerOfQuestionExist ,getSingleAnswer);
router.get('/:answers_id/like', [checkAnswerOfQuestionExist, getAccessToRoute] ,likeAnswer);
router.get('/:answers_id/dislike', [checkAnswerOfQuestionExist, getAccessToRoute] ,dislikeAnswer);
router.put('/:answers_id/edit', [checkAnswerOfQuestionExist, getAccessToRoute ,getAnswerOwnerAccess] ,editAnswer);
router.delete('/:answers_id/delete', [checkAnswerOfQuestionExist, getAccessToRoute ,getAnswerOwnerAccess] ,deleteAnswer);


module.exports = router;