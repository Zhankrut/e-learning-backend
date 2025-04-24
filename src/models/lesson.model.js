import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
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
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true
    },
    contentURL: {
        type: String,
        required: true,
    },
    

},{ timestamps: true });

export const Lesson = mongoose.model("Lesson", moduleSchema);