const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const connectDatabase =require("./helpers/database/connectDatabase");
const { connect } = require("mongoose");

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

app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}: ${process.env.NODE_ENV}`);
});