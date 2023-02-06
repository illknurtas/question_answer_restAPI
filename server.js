const express = require("express");

const app = express(); //creeating app

const PORT =3000||process.env.PORT; 
// process.env.PORT => is the port that assign default in different machines

app.get("/", (req, res) => {
    res.send("Question Answer API - Updated");
});

app.listen(PORT, ()=>{
    console.log(`App started on PORT ${PORT}`);
});