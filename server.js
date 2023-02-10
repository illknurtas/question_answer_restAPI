const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const connectDatabase =require("./helpers/database/connectDatabase");
const { connect } = require("mongoose");
const customErrorHandler = require("./middlewares/errors/customErrorHandler")
const path = require("path");

// ENVIRONMENT VARIABLES

dotenv.config({
    path:"./config/env/config.env",
});

// MONGODB CONNECTION

connectDatabase();
const app = express();

// EXPRESS - BODY MIDDLEWARE
app.use(express.json());

const PORT =process.env.PORT; 

// ROUTERS MIDDLEWARE

app.use("/api", routers);

// ERROR HANDLER

app.use(customErrorHandler);

// STATIC FILES
app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}: ${process.env.NODE_ENV}`);
});
