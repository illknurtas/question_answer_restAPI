const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const connectDatabase =require("./helpers/database/connectDatabase");
const { connect } = require("mongoose");
const customErrorHandler = require("./middlewares/errors/customErrorHandler")

// Environment variables
dotenv.config({
    path:"./config/env/config.env",
});

// MongoDB Connection
connectDatabase();

const app = express();

const PORT =process.env.PORT; 

// ROUTERS MIDDLEWARE
app.use("/api", routers);

// ERROR HANDLER
app.use(customErrorHandler);


app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}: ${process.env.NODE_ENV}`);
});
