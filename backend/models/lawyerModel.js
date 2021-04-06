import mongoose from "mongoose";
import bcrypt from "bcrypt";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User "
    }
  },
  { timestamps: true }
);
const lawyerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    liscenceID: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    isVerified:{
      type: Boolean,
      required: true,
      default: false,
    },
    userType: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

lawyerSchema.methods.matchPassword  = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

lawyerSchema.pre('save',async function (next){
  if(!this.isModified('password')){
    next()
  }
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})


const Lawyer = mongoose.model("Lawyer", lawyerSchema);

export default Lawyer;
