const express = require('express');
const question = require('./questions');
const auth = require('./auth');

// API
const router = express.Router();

router.use("/questions", question);
router.use("/auth", auth);

module.exports = router;