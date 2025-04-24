import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bio:{
        type: String,
        required: false,
    },
    profilePicture:{
        type: String,
        required: false,
    },
    lastlogin:{
        type: Date,
        required: false,
    },

},{timestamps:true});

export const Profile = mongoose.model('Profile', profileSchema);