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
    throw new Error("case already exist");
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

const userCases = asyncHandler(async (req, res) => {
  console.log(req)

    const {
      _id
    } = req.user;
    //  res.json({_id})
    const cases = await Case.find({lawyerId:_id})
    if(cases.length>0)
    {res.status(201).json(cases)
    }
    else{
        res.send("not found any cases")
    }
  });


export { createCase,userCases };
