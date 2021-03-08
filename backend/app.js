import express from 'express';
import dotenv from "dotenv"; 
import lawyers from "./data/lawyers.js";
dotenv.config()
const app = express()
app.get('/',(req,res)=>{
        res.send("yo")
})
app.get('/api/lawyers',(req,res)=>{
    res.json(lawyers)
})
app.get('/api/lawyers/:id',(req,res)=>{
    const lawyer=lawyers.find(l=>l._id===req.params.id
    )
    res.json(lawyer)
})
const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`server on ${process.env.NODE_ENV} on ${PORT}`));
