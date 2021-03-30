import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Lawyer from "../models/lawyerModel.js";
import generateToken from "../utils/generateToken.js";

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password, userType } = req.body;
  if (userType == "user") {
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password)))
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id),
      });
    else {
      res.status(401);
      throw new Error("invalid email and password");
    }
  } else if (userType == "lawyer") {
    const lawyer = await Lawyer.findOne({ email: email });
    if (lawyer && (await lawyer.matchPassword(password)))
      res.json({
        _id: lawyer._id,
        name: lawyer.name,
        email: lawyer.email,
        userType: lawyer.userType,
        image: lawyer.image,
        liscenceID: lawyer.liscenceID,
        category: lawyer.category,
        description: lawyer.description,
        token: generateToken(lawyer._id),
      });
    else {
      res.status(401);
      throw new Error("invalid email and password");
    }
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,userType, liscenceID,category,description,image} = req.body;
  if (userType == "user") {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400);
      throw new Error("user already exist");
    }
    const user = await User.create({
      name,
      email,
      password,
      userType,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid data");
    }
  }
  else if(userType=='lawyer')
  {
    const lawyerExist = await Lawyer.findOne({ email: email });
  if (lawyerExist) {
    res.status(400);
    throw new Error("lawyer already exist");
  }
  const lawyer = await Lawyer.create({
    name,
    email,
    password,
    liscenceID,
    category,
    description,
    image,
    userType
  });
  if (lawyer) {
    res.status(201).json({
      _id: lawyer._id,
      name: lawyer.name,
      email: lawyer.email,
      userType:lawyer.userType,
      image:lawyer.image,
      liscenceID:lawyer. liscenceID,
      category:lawyer.category,
      description:lawyer.description,
      token: generateToken(lawyer._id),
    });
  }
  else
  {
    res.status(400)
    throw new Error('invalid data')
  }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      userType: user.userType,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export { authUser, getUserProfile, registerUser, updateUserProfile ,getUsers};
