const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"]
    },
    email:{
        type: String,
        required: [true,"Please provide an email"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email address"
        ]
    },
    role:{
        type: String,
        default:"user",
        enum: ["user", "admin"] 
    },
    password:{
        type: String,
        minlength:[6,"Please provide a password with at least 6 characters"],
        required:[true,"Please provide a valid password"],
        select: false
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    title:{
        type: String,
    },
    about:{
        type: String,
    },
    place:{
        type: String,
    },
    website:{
        type: String,
    },
    profile_img:{
        type: String,
        default:"default.jpg"
    },
    blocked:{
        type: Boolean,
        default:false
    },
    resetPasswordToken:{
        type: String,
    },
    resetPasswordExpire:{
        type: Date,
    }
});

// USER SCHEMA METHODS
userSchema.methods.generateJWTFromUser = function(){
    const{JWT_SECRET_KEY, JWT_EXPIRE}= process.env;

    const payload ={
        id: this._id,
        name: this.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE,
    });
    return token;
};


// FORGOT PASSWORD - PASSWORD HASHING
userSchema.methods.getResetPasswordTokenFromUser = function(){

    const randomHextString = crypto.randomBytes(15).toString("hex");
    const {RESET_PASSWORD_EXPIRE} = process.env;
    
    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHextString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire= Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;
};

userSchema.pre("save", function(next){
    // if password did not change
    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if (err) next(err);
        
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
    // next();
});


module.exports = mongoose.model("User", userSchema);