import { Module } from '../models/module.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Course } from '../models/course.model.js';

// create module 
const createModule = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const { courseId } = req.params;
    const { userId } = req.user?._id;

    if (!title || !description) {
        throw new ApiError(400, "Please provide all required fields");
    }
    if (!courseId) {
        throw new ApiError(400, "Please provide courseId");
    }
    if (!isValidObjectId(courseId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid courseId or userId");
    }

    const isValidUser = await User.findById(userId).select("role");
    const allowedRoles = ["admin", "faculty"];
    if (!allowedRoles.includes(isValidUser.role)) {
        throw new ApiError(403, "You are not authorized to create a module");
    }

    const module = await Module.create({
        title,
        description,
        course: courseId,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, module, "Module created successfully")
        );
});

// update module 
const updateModule = asyncHandler(async (req, res) => {
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
    const allowedRoles = ["admin", "faculty"];
    if (!allowedRoles.includes(isValidUser.role)) {
        throw new ApiError(403, "You are not authorized to update a module");
    }

    const updatedModule = await Module.findByIdAndUpdate(moduleId, {
        title,
        description,
    }, { new: true });

    if (!updatedModule) {
        throw new ApiError(404, "Module not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedModule, "Module updated successfully")
        );
 });

//get all modules
const getAllModules = asyncHandler(async (req, res) => { 
    const { courseId } = req.params;
    const { userId } = req.user?._id || null;

    if (!courseId) {
        throw new ApiError(400, "Please provide courseId");
    }
    if (!isValidObjectId(courseId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid courseId or userId");
    }

    const modules = await Module.find({ course: courseId });
    if (!modules) {
        throw new ApiError(404, "Modules not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, modules, "Modules fetched successfully")
        );
});

// delete module
const deleteModule = asyncHandler(async (req, res) => {
    const { moduleId } = req.params;
    const { userId } = req.user?._id || null;

    if (!moduleId) {
        throw new ApiError(400, "Please provide moduleId");
    }
    if (!isValidObjectId(moduleId) || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid moduleId or userId");
    }

    const isValidUser = await User.findById(userId).select("role");
    const allowedRoles = ["admin", "faculty"];
    if (!allowedRoles.includes(isValidUser.role)) {
        throw new ApiError(403, "You are not authorized to delete a module");
    }

    const deletedModule = await Module.findByIdAndDelete(moduleId);
    if (!deletedModule) {
        throw new ApiError(404, "Module not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedModule, "Module deleted successfully")
        );
 });

export {
    createModule,
    updateModule,
    deleteModule,
    getAllModules
}

