const CustomAPIError = require('../errors/custom-error');
const {StatusCodes} = require('http-status-codes');
const JWT = require('jsonwebtoken');

const create_user = async (req,res) => {
    const {username, password} = req.body;
    
    if(!username || !password){
        throw new CustomAPIError('Please enter both username and password!', StatusCodes.BAD_REQUEST);
    }

    //make fake ID
    const id = Date.now();
    //create JWT
    const jwt = JWT.sign({id,username},process.env.JWT_SECRET, { expiresIn: '1d' });

    //send
    console.log(id, username, password, jwt);
    res.status(StatusCodes.OK).json({ msg : "user created", token : jwt});
};


const get_dashboard = async(req,res) => {
    const token = req.headers.authorization.split(" ")[1];

    try{
        const decoded = JWT.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        //check if token is valid. once valid check if any existing user in real projects
        //console.log({token, decoded});
        res.status(StatusCodes.OK).json({ 
            msg : `Hi ${req.user.username}`, 
            secret : `Your Secret Data: ${Math.floor(Math.random()*100)}`
        });
    } catch(error) {
        throw new CustomAPIError('Invalid/No Token Provided', StatusCodes.BAD_REQUEST);
    }
        
};


module.exports = {
    create_user, get_dashboard
};