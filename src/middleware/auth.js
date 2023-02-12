const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const verifyToken = (token) =>  {
    return jwt.verify(token, process.env.JWT_SECRET)
}


exports.isAuthencticatedUser = (req, res, next) => {

    try {
        const bearerToken = req?.headers?.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Please provide a valid token', status: 'Failed' });
        }

        const token = bearerToken.split(" ")[1];

        let user;
        try {
            user = verifyToken(token);
        } catch (e) {
            return res.status(400).json({ message: 'Please provide a valid token', status: 'Failed' });
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: 'Failed' });
        }

        req.user = user.user;

        next();

    } catch (e) {
        return res.status(500).json({ message: e.message, status: 'Failed' });
    }
};



exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
           return res.status(403).send({message : `Role ${req.user.role} is not allowed to access this resource` })

        }
        // if user is admin then if condtion will be false
        next()

    }    
}