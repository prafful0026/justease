import express from 'express';
import dotenv from "dotenv"; 
import connectDB from './config/db.js'
import lawyerRoutes from './routes/lawyerRoutes.js'
import { notFound,errorHandler } from './middlewares/errorMiddleware.js'
dotenv.config()
connectDB()
const app = express()
app.get('/',(req,res)=>{
        res.send("yo")
})
app.use('/api/lawyers',lawyerRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`server on ${process.env.NODE_ENV} on ${PORT}`));
