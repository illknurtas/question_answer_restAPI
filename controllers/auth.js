const customErrorHandler = require('../middlewares/errors/customErrorHandler');
const CustomError = require('../helpers/error/CustomError');
const User = require ('../models/user');
const asyncErrorWrapper = require('express-async-handler');
const {sendJWTToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const sendEmail = require("../helpers/libraries/sendEmail");

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

// FORGOT PASSWORD
const forgotPassword = asyncErrorWrapper(async(req, res, next) => {
    const resetEmail = req.body.email;

    const user = await User.findOne({ email: resetEmail});
    if(!user){
        return next(
            new CustomError("There is no user with that email " , 400)
        );
    };

    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();
    
    const resetPasswordUrl= `http://localhost:3000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
        <h3>Reset Your Password</h3>
        <p>This <a href='${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour </p>
    `;

    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'useforanswers2017@gmail.com', // your gmail address
            pass:'fsxwzqpjkklfpion' // your password given by google
        }
    });
    let mailOptions={
        from:'useforanswers2017@gmail.com', // your gmail address
        to: resetEmail,
        subject: 'Reset Your Password',
        html : emailTemplate
    };
    transporter.sendMail(mailOptions,(err,data)=>{
        if(err){
            return next(
                new CustomError(
                    "Email could not be sent to your account", 500
                )
            );
        }
        else{
            console.log("Token has been sent to your account!");
        }
    });
    res.json({
        success:true,
        message:"Token has been sent to your account!"
    });
});

// RESET PASSWORD
const resetPassword = asyncErrorWrapper(async(req, res, next)=>{

    const {resetPasswordToken} = req.query;
    const {password} = req.body;

    if(!resetPasswordToken){
        return next(new CustomError("pleease provide a valid password",400));
    };

    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    });

    if(!user){
        return next(new CustomError("Invalid token or session expired",400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200)
    .json({
        success: true,
        message:"Your password has been reset successfully"
    });
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
    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_img": req.savedProfileImage
    },{
        new:true,
        runValidators: true
    });
    res.status(200)
    .json({
        success: true,
        message:"Image uploaded successfully",
        data:user
    });
});

// EDIT DETAILS
const editDetails = asyncErrorWrapper(async(req, res, next) => {

    const editInformation = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, editInformation,{
        new : true,
        runValidators: true
    });
    return res.status(200)
    .json({
        success: true,
        data:user
    })
});


module.exports ={
    register,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editDetails
};