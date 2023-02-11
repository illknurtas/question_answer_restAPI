const express = require("express");
const {getAccessToRoute, getAdminAccess} = require("../middlewares/authorization/auth");

// BLOCK USER
// DELETE USER  
const router = express.Router();

router.use([getAccessToRoute, getAdminAccess]);

router.get("/",(req,res,next)=>{
    res.status(200)
    .json({
        success: true,
        message: "Admin page"
    });
});

module.exports = router;