import { Lesson } from "../models/lesson.model.js";
import { Module } from "../models/module.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { isValidObjectId } from "mongoose";

// create a lesson 
const createLesson = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { moduleId } = req.params;
    const { userId } = req.user?._id;

    if (!title || !description) {
        throw new ApiError(400, "Please provide all required fields");
    }
    if (!moduleId) {
        throw new ApiError(400, "Please provide moduleId");
    }
    if (!isValidObjectId(moduleId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid moduleId or userId");
    }

    const isValidUser = await User.findById(userId).select("role");
    if (isValidUser.role !== "admin" && isValidUser.role !== "faculty") {
        throw new ApiError(403, "You are not authorized to create a lesson");
    }
    // TODO : write code to upload the video to cloudinary and get the url
    const VidoeURL = "https://www.youtube.com/watch?v=2Vv-BfVoq4g"; // this is a dummy url, you can replace it with the actual url
    const lesson = await Lesson.create({
        title,
        description,
        module: moduleId,
        contentURL: VidoeURL,
    });

    const createdLesson = await Lesson.findById(lesson._id).select("module", "title", "description");

    if (!createdLesson) {
        throw new ApiError(404, "Lesson not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdLesson, "Lesson created successfully")
        );
});

// update lesson
const updateLesson = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { moduleId, lessonId } = req.params;
    const { userId } = req.user?._id;

    if (!title || !description) {
        throw new ApiError(400, "Please provide all required fields");
    }
    if (!moduleId) {
        throw new ApiError(400, "Please provide moduleId");
    }
    if (!isValidObjectId(moduleId) || !isValidObjectId(userId) || !isValidObjectId(lessonId)) {
        throw new ApiError(400, "Invalid moduleId or userId or lessonId");
    }

    const isValidUser = await User.findById(userId).select("role");
    if (isValidUser.role !== "admin" && isValidUser.role !== "faculty") {
        throw new ApiError(403, "You are not authorized to create a lesson");
    }
    // TODO : write code to upload the video to cloudinary and get the url
    const VidoeURL = "https://www.youtube.com/watch?v=2Vv-BfVoq4g"; // this is a dummy url, you can replace it with the actual url
    const lesson = await Lesson.findByIdAndUpdate(lessonId, {
        title,
        description,
        module: moduleId,
        contentURL: VidoeURL,
    }, { new: true });

    if (!lesson) {
        throw new ApiError(404, "Lesson not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lesson, "Lesson updated successfully")
        );

});

// delete lesson
const deleteLesson = asyncHandler(async (req, res) => {
    const { lessonId } = req.params;
    const { userId } = req.user?._id;

    if (!isValidObjectId(userId) || !isValidObjectId(lessonId)) {
        throw new ApiError(400, "Invalid userId or lessonId");
    }

    const isValidUser = await User.findById(userId).select("role");
    if (isValidUser.role !== "admin" && isValidUser.role !== "faculty") {
        throw new ApiError(403, "You are not authorized to create a lesson");
    }

    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) {
        throw new ApiError(404, "Lesson not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lesson, "Lesson deleted successfully")
        );
});

// get all lessons of current module
const getAllLessons = asyncHandler(async (req, res) => {
    const { moduleId } = req.params;
    const { userId } = req.user?._id;

    if (!isValidObjectId(userId) || !isValidObjectId(moduleId)) {
        throw new ApiError(400, "Invalid userId or moduleId");
    }

    const lessons = await Lesson.find({ module: moduleId }).select("module", "title", "description", "contentURL");

    if (!lessons) {
        throw new ApiError(404, "Lessons not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lessons, "Lessons fetched successfully")
        );
});


export {
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessons
}