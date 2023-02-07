const mongoose = require ("mongoose");

const connectDatabase = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true})
    .then(()=>{
        console.log("MongoDb Connection is Successfull!");
    })
    .catch(err=>{
        console.log(err);
    });
}

module.exports = connectDatabase;