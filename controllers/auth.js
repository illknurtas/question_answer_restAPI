const User = require ('../models/user');
const register = async (req, res, next) => {
    // POST DATA 
    const name ="İlayda günevi Joubert";
    const email ="deneme3@gmail.com";
    const password ="12345";

    // async await
    const user = await User.create({
        name,
        email,
        password
    });

    res.status(200).json({
        success : true,
        data: user
    })
}

module.exports ={
    register
};