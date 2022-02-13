const {UnauthorisedError} = require("../errors");
const JWT = require('jsonwebtoken');

const authMiddleware = async (req,res,next) => {
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith('Bearer ')){
        throw new UnauthorisedError('Invalid/No Token Provided');
    }

    const token = auth.split(" ")[1];
    try{
        const decoded = JWT.verify(token,process.env.JWT_SECRET);
        //check if token is valid. once valid check if any existing user in real projects
        req.user = decoded;
        next();
    } catch(error) {
        throw new UnauthorisedError('Invalid/No Token Provided');
    }
};

module.exports = authMiddleware;