const express = require("express");
const {getSingleUser, getAllUsers} = require("../controllers/user");
const {checkUserExist}= require ("../middlewares/database/databaseErrorHelpers");
const userQueryMw = require("../middlewares/query/userQueryMw");
const User =  require ("../models/user");

const router = express.Router();

router.get("/", userQueryMw(User) , getAllUsers);
router.get("/:id", checkUserExist, getSingleUser);

module.exports = router;