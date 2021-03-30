import asyncHandler from "express-async-handler";
import Lawyer from "../models/lawyerModel.js";
import generateToken from "../utils/generateToken.js";

const getLawyers = asyncHandler(async (req, res) => {
  const lawyers = await Lawyer.find({});
  res.json(lawyers);
});

const getLawyerById = asyncHandler(async (req, res) => {
  const lawyer = await Lawyer.findById(req.params.id);

  if (lawyer) {
    res.json(lawyer);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getLawyerProfile=asyncHandler(async (req, res) => {
  const lawyer=await Lawyer.findById(req.lawyer._id)

  if(lawyer)
{
  res.json({
    _id: lawyer._id,
    name: lawyer.name,
    email: lawyer.email,
    userType: lawyer.userType,
    image: lawyer.image,
    liscenceID: lawyer.liscenceID,
    category: lawyer.category,
    description: lawyer.description,
  });
}


});



export { getLawyerById, getLawyers,getLawyerProfile };
