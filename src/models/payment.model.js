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
    }
   
}, {timestamps: true});

paymentSchema.pre("save", async function (next) {
    if (!this.isModified("status")) return next(); // if the status is not modified then return next
    this.status = "pending"; // set the status to pending by default
    next();
});

paymentSchema.methods.updateStatus = async function (status) {
    this.status = status; // update the status
    await this.save(); // save the changes to the database
}

export const Payment = mongoose.model("Payment", paymentSchema);