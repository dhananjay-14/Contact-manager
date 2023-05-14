const express = require("express");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { use } = require("../routes/contactRoutes");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error ("User is already registered");
    } 

    //Hashing password 
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("hashed password is ", hashedPassword);
    const user =await User.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log(`User created successfully : ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});

    }
    else{
        res.status(400);
        throw new Error("could not create user");
    }
    res.json({message:"Registered the user"});
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = await User.findOne({email});
    //comparing user's entered password with the saved hashed password in database
    if(user&& (bcrypt.compare(user.password,password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email:user.email,
                id:user.id,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        res.status(201).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error ("Invalid credentials");
    }
});

//@desc get Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req,res)=>{
    console.log("entered current user function")
    res.json(req.user);
});
module.exports = {registerUser,loginUser,currentUser};
