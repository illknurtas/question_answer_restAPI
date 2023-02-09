const customError = require('../../helpers/error/CustomError');
const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, res, next) => {
    // Token
    const {JWT_SECRET_KEY} = process.env;

    if(!isTokenIncluded(req)){
        // 401 Unauthorized
        // 403 Forbidden
        return next(
            new customError("You are not allowed to access",401)
        );
    };

    const accessToken = getAccessTokenFromHeader(req);

    jwt.verify(accessToken, JWT_SECRET_KEY,(err, decoded)=>{
        if(err){
            return next(
                new customError("You are not allowed to access",401)
            );
        }
        req.user = {
            id: decoded.id,
            name: decoded.name
        };
        next();
    });
    next();
}
module.exports = {
    getAccessToRoute
};