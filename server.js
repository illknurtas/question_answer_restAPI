const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");

dotenv.config({
    path:"./config/env/config.env",
});

const app = express(); //creeating app

const PORT =process.env.PORT; 
// process.env.PORT => is the port that assign default in different machines

// ROUTERS MIDDLEWARE
app.use("/api", routers);

app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}: ${process.env.NODE_ENV}`);
});