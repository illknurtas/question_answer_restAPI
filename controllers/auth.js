const customErrorHandler = require('../middlewares/errors/customErrorHandler');
const CustomError = require('../helpers/error/CustomError');
const User = require ('../models/user');
const asyncErrorWrapper = require('express-async-handler');
const {sendJWTToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");

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

// LOGIN 
const login = asyncErrorWrapper(async(req, res, next) => {

    const{email, password} = req.body;
    if(!validateUserInput(email,password)) {
        return next(new CustomError("Please check your input(s)",400));
    };
    const user = await User.findOne({email}).select("+password");
    // console.log(user);
    if(!comparePassword(password,user.password)) {
      return  next(new CustomError("Please check your credentials",400));
    }

    sendJWTToClient(user,res);
    
});

// LOGOUT
const logout = asyncErrorWrapper(async(req, res, next) => {

    const {NODE_ENV}=process.env;

    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === 'development' ? false : true
    })
    .json({
        success: true,
        message:"Logged out successfully"
    })

});


// TOKEN PART
const getUser = (req, res, next) => {
    res.json({
        success: true,
        data:{
            id: req.user.id,
            name: req.user.name
        }
    });
};

// IMAGE UPLOAD
const imageUpload = asyncErrorWrapper(async(req, res, next) => {
    req.status(200)
    .json({
        success: true,
        message:"Image uploaded successfully"
    });
});


module.exports ={
    register,
    getUser,
    login,
    logout,
    imageUpload
};