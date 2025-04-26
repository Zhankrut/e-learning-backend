import { Enrollment } from "../models/enrollment.model";
import { Course } from "../models/course.model";
import { User } from "../models/user.model";

import {asyncHandler} from "../middleware/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// create a enrollment 
const createEnrollment = asyncHandler(async (req, res) => {});

// get all enrollments 
const getAllEnrollments = asyncHandler(async (req, res) => {});

// update a enrollment 
const updateEnrollment = asyncHandler(async (req, res) => {});

// delete a enrollment
const deleteEnrollment = asyncHandler(async (req, res) => {});


export {
    createEnrollment,
    getAllEnrollments,
    updateEnrollment,
    deleteEnrollment
}
