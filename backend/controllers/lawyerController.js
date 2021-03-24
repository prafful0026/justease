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




export { getLawyerById, getLawyers };
