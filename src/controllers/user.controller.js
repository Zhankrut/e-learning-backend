import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';


// generate access token and refresh token for the user
const generateAccessAndRefreshToken = async ({ userId }) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save(validateBeforeSave = false);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refress token ", error);
    }
}

// register user 
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, LastName, email, password, role } = req.body;

    if ([firstName, LastName, email, password, role].some(field => (field.trim() === ""))) {
        throw new ApiError(400, " all fields are required ");
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new ApiError(400, "Invalid email format");
    }

    const existedUser = await User.findOne({
        email: email.tolowerCase()
    })

    if (existedUser) {
        throw new ApiError(400, " this email is already registered ");
    }

    const user = await User.create({
        firstName,
        LastName,
        email: email.toLowerCase(),
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(400, " the user cannot be created ");
    }

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdUser, " the user has been created successfully ")
        );

});

// login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some(field => (field.trim() === ""))) {
        throw new ApiError(400, " all fields are required ");
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findOne({
        email: email.toLowerCase()
    });

    if (!user) {
        throw new ApiError(400, " this email is not registered ");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, " the password is incorrect ");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken({ userId: user._id });

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            }, " the user has been logged in successfully ")
        );
})

//logout user
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        { new: true }
    )

    const option = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .cookie("accessToken", "", option)
        .cookie("refreshToken", "", option)
        .json(
            new ApiResponse(200, {}, " the user has been logged out successfully ")
        );
});

// refresh token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies.drefreshToken || req.body.refreshToken;

    if (!refreshToken) {
        throw new ApiError(400, " the refresh token is required ");
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded?._id);

        if (!user) {
            throw new ApiError(400, " the user is not found ");
        }

        if (user.refreshToken !== refreshToken) {
            throw new ApiError(400, " the refresh token is not valid ");
        }

        const option = {
            httpOnly: true,
            secure: true,
        }
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken({ userId: user._id });

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", newRefreshToken, option)
            .json(
                new ApiResponse(200, {}, " the access token has been refreshed successfully ")
            );
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing access token ", error);
    }
});

// change password 
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if ([currentPassword, newPassword].some(field => (field.trim() === ""))) {
        throw new ApiError(400, " all fields are required ");
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
        throw new ApiError(400, " the user is not found ");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, " the password is incorrect ");
    }

    user.password = newPassword;
    await user.save(validateBeforeSave = false);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, " the password has been changed successfully ")
        );
});

// get current user
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(400, " the user is not found ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, " the user has been fetched successfully ")
        );
});

// update account details
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body;

    if ([firstName, lastName, email].some(field => (field.trim() === ""))) {
        throw new ApiError(400, " all fields are required ");
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new ApiError(400, "Invalid email format");
    }

    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(400, " the user is not found ");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();
    await user.save(validateBeforeSave = false);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, " the account details have been updated successfully ")
        );
});



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails
}
