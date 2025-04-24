import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catagory",
        required: true
    },
    instructor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);