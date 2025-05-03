import { Profile } from '../models/profile.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary, deleteOnCloudinary } from '../utils/cloudinary.js';


// create profile 
const createProfile = asyncHandler(async (req, res) => {

    const userId = req.user?._id;
    const { bio } = req.body;

    if (!userId) {
        throw new ApiError(400, " the user cannot be found ");
    }

    if (!bio || bio === "") {
        throw new ApiError(400, " there is no bio provided ");
    }
    console.log(req.file);
    const profilePictureFile = req.file?.path;
    console.log(profilePictureFile);
    if (!profilePictureFile) {
        throw new ApiError(400, "Avatar is required");
    }

    const profile = await uploadOnCloudinary(profilePictureFile);

    if (!profile) {
        throw new ApiError(400, " the profile cannot be created ");
    }

    const user = await Profile.create({
        bio,
        profilePicture: profile.url,
        lastlogin: Date.now(),
        userID: userId
    });


    if (!user) {
        throw new ApiError(400, " the profile cannot be created ");
    }

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, " the profile has been created successfully ")
        )
});

//update profile 
const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { bio } = req.body;

    if (!userId) {
        throw new ApiError(400, " the user cannot be found ");
    }

    if (!bio || bio === "") {
        throw new ApiError(400, " there is no bio provided ");
    }

    const profilePictureFile = req.file?.path;
    if (!profilePictureFile) {
        throw new ApiError(400, "Avatar is required");
    }

    const profile = await uploadOnCloudinary(profilePictureFile);

    if (!profile) {
        throw new ApiError(400, " the profile cannot be created ");
    }

    const user = await Profile.findOneAndUpdate(
        { userID: userId },
        {
            bio,
            profilePicture: profile.url
        },
        { new: true }
    );


    if (!user) {
        throw new ApiError(400, " the profile cannot be updated ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, " the profile has been updated successfully ")
        )
});

//get profile by user id 
const getProfileByUserId = asyncHandler(async (req, res) => {
    const userId  = req.user?._id;

    if (!userId) {
        throw new ApiError(400, " the user cannot be found ");
    }

    const profile = await Profile.findOne({ userID: userId });

    if (!profile) {
        throw new ApiError(400, " the profile cannot be found ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, profile, " the profile has been found successfully ")
        )
});

// delete user profile 
const deleteProfile = asyncHandler(async (req, res) => {
    const  userId  = req.user?._id;

    if (!userId) {
        throw new ApiError(400, " the user cannot be found ");
    }

    const profile = await Profile.findOneAndDelete({ userID: userId });

    if (!profile) {
        throw new ApiError(400, " the profile cannot be deleted ");
    }
    let profilePicture  = profile.profilePicture.split("/").at(-1).split(".").at(0);

    const deleteProfilePicture = await deleteOnCloudinary(profilePicture);
    console.log(deleteProfilePicture);
    if (!deleteProfilePicture) {
        throw new ApiError(400, " the profile picture cannot be deleted ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, profile, " the profile has been deleted successfully ")
        )
});

export {
    createProfile,
    updateProfile,
    getProfileByUserId,
    deleteProfile
}