const User = require("../models/user");
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require("express-async-handler");
const { checkUserExist } = require("../middlewares/database/databaseErrorHelpers");

const blockUser = asyncErrorWrapper(async(req, res, next)=>{
    const {id} = req.params;
    const user = await User.findById(id);

    user.blocked = !user.blocked;
    await user.save();
    return res.status(200)
    .json({
        success: true,
        message:"Blocking - Unblocking is successful"
    });
});

module.exports = {
    blockUser
};