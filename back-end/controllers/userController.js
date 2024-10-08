const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

//@desc Register user
//@route POST
//@access Public
const registerUser = asyncHandler(async(req,res) =>{
    const {name,email,password} = req.body;
    if(!name||!email||!password){
      res.status(401).json({message:"Required fields must be filled"});
    }

    //check user exists
    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400)
        throw new Error("User already exist!");
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create user

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Something went wrong in the registration, try again");
    }
})

//@desc Authenticate user
//@route POST
//@access Public
const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalied user credentials");
    }
})

//@desc Get user data
//@route GET
//@access Private
const getUser = asyncHandler(async(req,res) =>{

    res.status(200).json(req.user)
})

//Generate JWT

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}