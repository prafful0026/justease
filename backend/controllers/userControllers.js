import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  // const matchPassword = async (enteredPassword) => {
  //   await bcrypt.compare(user.password, enteredPassword);
  // };
  if (user &&(await user.matchPassword(password)))
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  else {
    res.status(401);
    throw new Error("invalid email and password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
  else
  {
    res.status(400)
    throw new Error('invalid data')
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (user) {
      user.name=req.body.name||user.name 
      user.email=req.body.email||user.email
      if(req.body.password){
        user.password=req.body.password
      }
      const updatedUser= await user.save()
      res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    }); 
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export { authUser, getUserProfile,registerUser , updateUserProfile };