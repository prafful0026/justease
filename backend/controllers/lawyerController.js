import asyncHandler from "express-async-handler";
import Lawyer from "../models/lawyerModel.js";
import generateToken from "../utils/generateToken.js";
import Case from "../models/caseModel.js"

const getLawyers = asyncHandler(async (req, res) => {
  const keyword=req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options: 'i'
    }
  }:{}
  const lawyers = await Lawyer.find({...keyword});
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

const reviewLawyer=asyncHandler(async(req,res)=>{
  console.log(req.user)
  const {rating,comment}=req.body;

  const lawyer=await Lawyer.findOne({_id:req.params.id})
  if(lawyer){
    const alreadyReviewed=lawyer.reviews.find(r=>r.user.toString()===req.user._id.toString())

    if(alreadyReviewed){
      res.status(400)
      throw new Error("already reviewed")
    }
    const review={
     name:req.user.name,
     rating:Number(rating),
     comment,
     user: req.user._id 
    } 
    lawyer.reviews.push(review)
    lawyer.numReviews=lawyer.reviews.length
    lawyer.rating = lawyer.reviews.reduce((acc,item)=>item.rating+acc,0)/lawyer.reviews.length
    await lawyer.save()
    res.status(201).json({message:"review added"})
  }
  else{
    res.status(404);
    throw new Error("Product not found");
  }
}) 

export const verifyLawyer=asyncHandler(async (req,res)=>{
  try {
    console.log(req.params.id)
  const lawyer = await Lawyer.findById(req.params.id);
  if(!lawyer)
  {
    res.status(404);
    throw new Error("lawyer not found");
  }
  else
  {
    lawyer.isVerified=!lawyer.isVerified
    const updatedLawyer= await lawyer.save();
    res.send("success")


  }
      
  } catch (error) {
    res.status(500)
    throw new Error("server error");

  }
})
const deleteLawyer = asyncHandler(async (req, res) => {
  const lawyer = await Lawyer.findById(req.params.id);
  if(lawyer)
  {
   await Case.deleteMany({lawyerId:lawyer._id})

      await lawyer.remove()
      res.json({message:"lawyer deleted"})   
  }
  else
  {
    res.status(404)
    throw new Error('lawyer not found')
  }
});
const getTopLawyers = asyncHandler(async (req, res) => {
  const lawyers = await Lawyer.find({}).sort({ rating: -1 }).limit(3)

  res.json(lawyers)
})

export { getLawyerById, getLawyers,getLawyerProfile,reviewLawyer ,deleteLawyer,getTopLawyers};
