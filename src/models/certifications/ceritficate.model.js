import mongoose from "mongoose";


const certificateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the users collection
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Reference to the courses collection
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now, 
    },
    certificateUrl: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
  },
  { timestamps: true } 
);

export const Certificate = model("Certificate", certificateSchema);