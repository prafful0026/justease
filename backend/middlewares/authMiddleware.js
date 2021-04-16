import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
// import User from "../models/userModel.js";
import Lawyer from "../models/lawyerModel.js";

import asyncHandler from "express-async-handler";

const protect =asyncHandler( async (req,res,next)=>{
    let token;

   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
   {
       try {
           token=req.headers.authorization.split(' ')[1]
           const decoded=jwt.verify(token,process.env.JWT_SECRET)
           const frontUser=await User.findById(decoded.id).select('-password')
           const frontLawyer=await Lawyer.findById(decoded.id).select('-password')
        //    console.log(frontLawyer)

          if(frontLawyer)
         { req.user=frontLawyer
            // console.log(req.user)
            next()
        }
          else if(frontUser)
         { req.user=frontUser
            next()
         
        }
       } catch (error) {
           console.error(error)
           res.status(401)
           throw new Error('Not authrouzed token')
       }
   }

   if(!token)
   {
       res.status(401)
       throw new Error("Not auth ,no token")
   }

   
}
)
const admin=(req,res,next)=>{
    if(req.user&&req.user.userType==="admin")
    next()
    else
    {
        res.status(401)
        throw new Error('not admin')
    }
}
export {protect,admin}