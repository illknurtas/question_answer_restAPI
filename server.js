const express = require("express");
const dotenv = require("dotenv");
const questions = require("./routers/questions");
const auth = require("./routers/auth");

dotenv.config({
    path:"./config/env/config.env",
});

const app = express(); //creeating app

const PORT =process.env.PORT; 
// process.env.PORT => is the port that assign default in different machines

// ROUTERS MIDDLEWARE

app.use("/api/questions",questions);
app.use("/api/auth",auth);

app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}: ${process.env.NODE_ENV}`);
});