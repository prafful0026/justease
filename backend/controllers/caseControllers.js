import asyncHandler from "express-async-handler";
import Case from "../models/caseModel.js";
// import Lawyer from "../models/lawyerModel.js";
// import generateToken from "../utils/generateToken.js";

const createCase = asyncHandler(async (req, res) => {
  const {
    email,
    contactNo,
    caseCategory,
    caseDescription,
    userId,
    lawyerId,
    caseId,
  } = req.body;

  const caseExist = await Case.findOne({ caseId: caseId });
  if (caseExist) {
    res.status(400);
    throw new Error("user already exist");
  } else {
    const newCase = await Case.create({
      email,
      contactNo,
      caseCategory,
      caseDescription,
      userId,
      lawyerId,
      caseId,
    });
    if (newCase) res.status(201).send("case made successfully");
    else {
      res.status(400);
      throw new Error("invalid data");
    }
  }
});

export { createCase };
