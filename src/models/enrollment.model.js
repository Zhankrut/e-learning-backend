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
        enum: ["active", "completed", "dropped"],
        default: "active"
    },

},{timestamps: true});

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);