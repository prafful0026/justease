
const express = require('express')
// const cors=require("cors")
// app.use(cors());

const lawyers = require('./data/lawyers.js')
const app = express()
app.listen(5000,console.log('server on 5000'));
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
// app.use(express.json())
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/User', {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("backend connected")).catch(err=>{console.log(err)})
// const userSchema=new mongoose.Schema({
//     email:String,
//     password:String
// })
// const User=mongoose.model('User',userSchema);
// app.post('/updateData',(req,res)=>{
//     console.log(req.body);
// const user=new User(req.body);
// user.save();
// })
// port = process.env.PORT || 5000
// app.listen(port, () => console.log("Backend server live on " + port));

// app.get("/home", (req, res) => {
// res.send({ message: "We on home!" });
// });

// app.get("/lawyers", (req, res) => {
//     res.send({ message: "We on lawyers!" });
//     });