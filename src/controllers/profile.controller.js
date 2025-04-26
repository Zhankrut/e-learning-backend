import {Profile} from '../models/profile.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


// create profile 
const createProfile = asyncHandler(async (req, res) => {});

//update profile 
const updateProfile = asyncHandler(async (req, res) => {});

//get profile by user id 
const getProfileByUserId = asyncHandler(async (req, res) => {});

// delete user profile 
const deleteProfile = asyncHandler(async (req, res) => {});

export {
    createProfile,
    updateProfile,
    getProfileByUserId,
    deleteProfile
}