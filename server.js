const express = require("express");
const dotenv = require("dotenv");

dotenv.config({
    path:"./config/env/config.env",
});

const app = express(); //creeating app

const PORT =process.env.PORT; 
// process.env.PORT => is the port that assign default in different machines

app.get("/", (req, res) => {
    res.send("Question Answer API - Updated");
});

app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}: ${process.env.NODE_ENV}`);
});