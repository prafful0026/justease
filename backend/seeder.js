import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import lawyers from './data/lawyers.js'
import User from './models/userModel.js'
import Case from './models/caseModel.js'
import Lawyer from './models/lawyerModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData= async ()=>{
try{
    await Case.deleteMany()
    await Lawyer.deleteMany()
    await User.deleteMany()

    const createdUsers=await User.insertMany(users)
    const adminUser=createdUsers[0]._id 
    const createdLawyers=lawyers.map(lawyer=>{
             return{...lawyer,user:adminUser}
    })
    await Lawyer.insertMany(createdLawyers)
    console.log('data imported')
    process.exit()
     
}

catch(err){
     console.error(err)
     process.exit(1)
}
}
const deleteData= async ()=>{
    try{
        await Case.deleteMany()
        await Lawyer.deleteMany()
        await User.deleteMany()
        console.log('data destroyed')
        process.exit()
         
    }
    
    catch(err){
         console.error(err)
         process.exit(1)
    }
    }
    
    if(process.argv[2]==='-d')
    deleteData()
    else
    importData()