const mongoose = require('mongoose');
const slugify = require('slugify');


const Schema = mongoose.Schema;
const questionSchema = new Schema({
    title:{
        type: String,
        required: [true,"Please enter a title"],
        minlenth:[10,"Please provide a title at least 10 characters length" ],
        unique: true
    },
    content:{
        type: String,
        required: [true,"Please enter a content"],
        minlenth:[20,"Please provide a content at least 10 characters length" ],
    },
    slug:String,
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    likes:[{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    answers:[{
        type: mongoose.Schema.ObjectId,
        ref: "Answer"
    }]
});

questionSchema.pre("save", function(next){
    if(!this.isModified("title")){
        next();
    }
    this.slug = this.makeSlug();
    next();
});

questionSchema.methods.makeSlug = function(){
    return slugify(this.title,{
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true,     
    });
};

module.exports = mongoose.model ("Questions",questionSchema);