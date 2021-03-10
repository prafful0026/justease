import asyncHandler from 'express-async-handler'
import express from 'express'
import Lawyer from '../models/lawyerModel.js'

const router=express.Router()

router.get('/',asyncHandler(async (req,res)=>{
  const lawyers=await Lawyer.find({})
//   res.status(401)
//   throw new Error('yoyio')
  res.json(lawyers)
}))
router.get('/:id',asyncHandler(async (req,res)=>{
    const lawyer=await Lawyer.findById(req.params.id)
    // console.log(lawyer)
    if(lawyer){
        res.json(lawyer)
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
    }))  

export default router