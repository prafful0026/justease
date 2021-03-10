import mongoose from "mongoose";

const caseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required:true
    },
    caseCategory: {
      type: String,
      required: true,
    },
    caseDesc: {
      type: String,
      required: true,
    },
    caseEvidence: {
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
