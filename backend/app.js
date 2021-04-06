import express from 'express';
import dotenv from "dotenv"; 
import connectDB from './config/db.js'
import lawyerRoutes from './routes/lawyerRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from "path";
import morgan from "morgan";
import { notFound,errorHandler } from './middlewares/errorMiddleware.js'
dotenv.config()
connectDB()
const app = express()

if(process.env.NODE_ENV==="development"){
        app.use(morgan('dev'))
}

app.use(express.json())
app.get('/',(req,res)=>{
        res.send("yo")
})
// app.get('/api/upload/',(req,res)=>{
//         res.send("yo") 
// })
app.use('/api/lawyers/',lawyerRoutes)
app.use('/api/users/',userRoutes)
app.use('/api/upload/',uploadRoutes)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`server on ${process.env.NODE_ENV} on ${PORT}`));