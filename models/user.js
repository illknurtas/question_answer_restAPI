const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

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
    }
});

// USER SCHEMA METHODS
userSchema.methods.generateJWTFromUser = function(){
    const{JWT_SECRET_KEY, JWT_EXPIRE}= process.env;
    const payload ={
        id: this.id,
        name: this.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE,
    });
    return token;
};


// PASSWORD HASHING
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
    next();
});


module.exports = mongoose.model("User", userSchema);