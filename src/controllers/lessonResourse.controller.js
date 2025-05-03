import { LessonResource } from "../models/lessonResourse.model.js";
import { Lesson } from "../models/lesson.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

// create a lesson resource
const createLessonResource = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const { lessonId } = req.params;
    const { userId } = req.user?._id;

    if (!name) {
        throw new ApiError(400, "Please provide all required fields");
    }
    if (!lessonId) {
        throw new ApiError(400, "Please provide lessonId");
    }
    if (!isValidObjectId(lessonId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid lessonId or userId");
    }

    const isValidUser = await User.findById(userId).select("role");
    const allowedRoles = ["admin", "faculty"];
    if (!allowedRoles.includes(isValidUser.role)) {
        throw new ApiError(403, "You are not authorized to create a lesson resource");
    }

    // TODO : write code to upload the pdf to cloudinary and get the url
    const pdfURL = "https://www.example.com/sample.pdf"; // this is a dummy url, you can replace it with the actual url

    const lessonResource = await LessonResource.create({
        lessonId,
        name,
        url: pdfURL,
    });

    if (!lessonResource) {
        throw new ApiError(404, "Lesson resource not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lessonResource, "Lesson resource created successfully")
        );

});

// get all lesson resources 
const getAllLessonResources = asyncHandler(async (req, res, next) => {
    const { lessonId } = req.params;
    const { userId } = req.user?._id;

    if (!lessonId) {
        throw new ApiError(400, "Please provide lessonId");
    }
    if (!isValidObjectId(lessonId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid lessonId or userId");
    }
    const lessonResources = await LessonResource.find({ lessonId });
    if (!lessonResources) {
        throw new ApiError(404, "Lesson resources not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lessonResources, "Lesson resources fetched successfully")
        );
});

// update a lesson resource 
const updateLessonResource = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const { lessonId, lessonResouceId } = req.params;
    const { userId } = req.user?._id;

    if (!name) {
        throw new ApiError(400, "Please provide all required fields");
    }
    if (!lessonId) {
        throw new ApiError(400, "Please provide lessonId");
    }
    if (!isValidObjectId(lessonId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid lessonId or userId");
    }

    const isValidUser = await User.findById(userId).select("role");
    const allowedRoles = ["admin", "faculty"];
    if (!allowedRoles.includes(isValidUser.role)) {
        throw new ApiError(403, "You are not authorized to update a lesson resource");
    }

    // TODO : write code to upload the pdf to cloudinary and get the url
    //and delete the old pdf from cloudinary
    const pdfURL = "https://www.example.com/sample.pdf"; // this is a dummy url, you can replace it with the actual url

    const lessonResource = await LessonResource.findByIdAndUpdate(lessonResouceId, {
        name,
        lessonId,
        url: pdfURL,
    }, { new: true });

    if (!lessonResource) {
        throw new ApiError(404, "Lesson resource cannot be updated");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lessonResource, "Lesson resource updated successfully")
        );

});


// delete a lesson resource 
const deleteLessonResource = asyncHandler(async (req, res, next) => {
    const { lessonResouceId } = req.params;
    const { userId } = req.user?._id;

    if (!isValidObjectId(lessonResouceId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid lessonResouceId or userId");
    }

    const isValidUser = await User.findById(userId).select("role");
    const allowedRoles = ["admin", "faculty"];
    if (!allowedRoles.includes(isValidUser.role)) {
        throw new ApiError(403, "You are not authorized to delete a lesson resource");
    }

    const lessonResource = await LessonResource.findByIdAndDelete(lessonResouceId);
    if (!lessonResource) {
        throw new ApiError(404, "Lesson resource not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lessonResource, "Lesson resource deleted successfully")
        );
});

export {
    createLessonResource,
    getAllLessonResources,
    updateLessonResource,
    deleteLessonResource
}

