const customErrorHandler = require('../middlewares/errors/customErrorHandler');
const CustomError = require('../helpers/error/CustomError');
const User = require ('../models/user');
const asyncErrorWrapper = require('express-async-handler');

const register = asyncErrorWrapper(async(req, res, next) => {
    // POST DATA 
    const name ="İlayda günevi";
    const email ="deneme3@gmail.com";
    const password ="12346";
        // async await
    const user = await User.create({
        name,
         email,
        password
    });
    res.status(200).json({
        success : true,
        data: user
    });
});

const errorTest = (req, res, next) => {

    return next(new TypeError("Type Error Message"));

};

module.exports ={
    register,
    errorTest,
};