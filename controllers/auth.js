const customErrorHandler = require('../middlewares/errors/customErrorHandler');
const CustomError = require('../helpers/error/CustomError');
const User = require ('../models/user');
const asyncErrorWrapper = require('express-async-handler');
const {sendJWTToClient} = require("../helpers/authorization/tokenHelpers");

const register = asyncErrorWrapper(async(req, res, next) => {
    // POST DATA 

    const {name, email, password, role} = req.body;

    // async await
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    sendJWTToClient(user,res);
});

const getUser = (req, res, next) => {
    res.json({
        success: true,
        data:{
            id: req.user.id,
            name: req.user.name
        }
    });
};

module.exports ={
    register,
    getUser
};