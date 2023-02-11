const express = require('express');
const question = require('./questions');
const auth = require('./auth');
const user = require('./user');

// API
const router = express.Router();

router.use("/questions", question);
router.use("/auth", auth);
router.use("/users",user);

module.exports = router;