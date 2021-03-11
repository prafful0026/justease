import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const matchPassword = async (password) => {
    await bcrypt.compare(user.password, password);
  };
  if (user && matchPassword)
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

export { authUser, getUserProfile };
