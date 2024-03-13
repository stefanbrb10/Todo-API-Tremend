const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashedPassword});
        await user.save();
        res.json({message: 'User created successfully'});
    } catch(err){
        next(err);
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({message: 'Invalid username or password'});
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid username or password'});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true});
        res.json({message: 'Logged in successfully', redirect:'/todos'});

    } catch(err){
        next(err);
    }
}; 

module.exports = {register, login};  