import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import e from 'express';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"], // we can add a custom message to all required fields
    },
    role: {
        type: string,
        required: [true, " the role must be selected "],
        enum: ["admin", "student", "faculty"],
        default: "user",
    },
    refreshToken: {
        type: String,
    }

}, { timestamps: true });

// the pre hook in mongoose is used to execute some code before saving the data to the database
// here we are not using arrow function because we want to use the this keyword and arrow function does not have this keyword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();// if the password is not modified then return next

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            // this is the payload of the token
            _id: this._id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            // this is the payload of the token
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema);