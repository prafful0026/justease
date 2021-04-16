import mongoose from "mongoose";

const caseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    lawyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      // required: true,
    },
    caseId:{
    type:String,
    required:true,
    unique:true
    },
    caseCategory: {
      type: String,
      required: true,
    },
    caseDescription: {
      type: String,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lawyerName:{
      type: String,
      required: true,
    },
    userName:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Case = mongoose.model("Case", caseSchema);

export default Case;
