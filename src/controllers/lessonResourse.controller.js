import { LessonResource } from "../models/lessonResourse.model";
import { Lesson } from "../models/lesson.model";

import { asyncHandler } from "express-async-handler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// create a lesson resource
const createLessonResource = asyncHandler(async (req, res, next) => { });

// get all lesson resources 
const getAllLessonResources = asyncHandler(async (req, res, next) => { });

// update a lesson resource 
const updateLessonResource = asyncHandler(async (req, res, next) => { });

// delete a lesson resource 
const deleteLessonResource = asyncHandler(async (req, res, next) => { });

export {
    createLessonResource,
    getAllLessonResources,
    updateLessonResource,
    deleteLessonResource
}

