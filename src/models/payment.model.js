import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "bank_transfer"],
        required: true
    },
}, {timestamps: true});

export const Payment = mongoose.model("Payment", paymentSchema);