import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },

},{timestamps: true});

enrollmentSchema.methods.changeStatus = function (newStatus) {
    this.status = newStatus;
    return this.save();
}

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);