const User = require ('../models/user');
const register = async (req, res, next) => {
    // POST DATA 
    const name ="İlayda günevi";
    const email ="deneme3@gmail.com";
    const password ="12346";
    try{
        // async await
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(200).json({
            success : true,
            data: user
        });
    }
    catch(err){
        return next(err);
    }
}
const errorTest = (req, res, next) => {
    // some code 
    throw new Error ("An error occurred");
};
module.exports ={
    register,
    errorTest,
};