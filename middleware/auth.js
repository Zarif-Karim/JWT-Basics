const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require('http-status-codes');
const JWT = require('jsonwebtoken');

const authMiddleware = async (req,res,next) => {
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer ')){
        throw new CustomAPIError('Invalid/No Token Provided', StatusCodes.BAD_REQUEST);
    }

    const token = auth.split(" ")[1];
    try{
        const decoded = JWT.verify(token,process.env.JWT_SECRET);
        //check if token is valid. once valid check if any existing user in real projects
        req.user = decoded;
        next();
    } catch(error) {
        throw new CustomAPIError('Invalid/No Token Provided', StatusCodes.BAD_REQUEST);
    }
};

module.exports = authMiddleware;