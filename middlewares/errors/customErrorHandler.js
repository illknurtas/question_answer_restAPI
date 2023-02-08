const customErrorHandler =  (err, req, res, next)=>{
    // console.error(err);//to see what kind of error happened

    console.error("Custom error handler");
    res
    .status(400)
    .json({
        success:false,
    })
}
module.exports = customErrorHandler;