import mongoose from "mongoose";
//TODO: add more fields to the invoice model

const invoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
}, { timestamps: true });

export const Invoice = mongoose.model("Invoice", invoiceSchema);