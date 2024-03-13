const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.header('Cookie').replace('token=', ''); // make the cookie recognizable
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch(err){
        res.status(401).json({ message: 'Invalid token' }); 
    }
};

module.exports = authenticate; 
  