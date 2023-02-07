const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, "Please provide a name"]
    },
    email:{
        type: String,
        required: true,
        unique: [true,"Please try different email address"],
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
})
module.exports = mongoose.model("User", userSchema);