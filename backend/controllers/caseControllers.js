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
    lawyerName,
    userName
  } = req.body;
  // console.log(contactNo)

  const caseExist = await Case.findOne({ caseId: caseId });
  // console.log(caseExist) 
  if (caseExist) {
    res.status(400);
    throw new Error("case already exist");
  } else {
    const newCase = await Case.create({
      email,
      userId,
      lawyerId,
      contactNo,
      caseCategory,
      caseDescription,
      caseId,
      lawyerName,
      userName
    });
    // newCase.save()
  // console.log(newCase)
    
    if (newCase) res.status(201).send("success");
    else {
      res.status(400);
      throw new Error("invalid data");
    }
  }
});

const userCases = asyncHandler(async (req, res) => {
  // console.log(req)

    const {
      _id
    } = req.user;
     console.log(_id)
    const caseLawyer = await Case.find({lawyerId:_id})
    const caseUser = await Case.find({userId:_id})
   if(caseLawyer.length>0)
   {
    res.status(201).json(caseLawyer)
   }
   else if(caseUser.length>0)
   {
    res.status(201).json(caseUser)
   }
    
    else{
      res.status(401);
      throw new Error("No cases found");
    }
  });

  const deleteCase = asyncHandler(async (req, res) => {
    console.log(req.user._id)
    const userCase = await Case.findById(req.params.id);
    console.log(userCase.lawyerId)
    if(userCase)
    {   if((userCase.lawyerId).equals(req.user._id)||(userCase.userId.equals(req.user._id)))
        { await userCase.remove()
        res.json({message:"case deleted"})
        }   
        else

        {
          res.status(404)
          throw new Error('case not found yth')
        }
    }
    else
    {
      res.status(404)
      throw new Error('case not found')
    }
  });
  const acceptCase = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    const userCase = await Case.findById(req.params.id);
    // console.log(userCase.lawyerId)
    if(userCase)
    {   if((userCase.lawyerId).equals(req.user._id))
        {  userCase.isAccepted=!userCase.isAccepted
           await userCase.save()
        res.json({message:"case accepted"})
        }   
        else

        {
          res.status(404)
          throw new Error('case not found yth')
        }
    }
    else
    {
      res.status(404)
      throw new Error('case not found')
    }
  });

export { createCase,userCases,deleteCase,acceptCase };
