import { Lesson } from "../models/lesson.model";
import { Module } from "../models/module.model";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js';

// create a lesson 
const createLesson = asyncHandler(async (req, res) => { });

// update lesson
const updateLesson = asyncHandler(async (req, res) => { });

// delete lesson
const deleteLesson = asyncHandler(async (req, res) => { });

// get all lessons of current module
const getAllLessons = asyncHandler(async (req, res) => { });


export {
    createLesson,
    updateLesson,
    deleteLesson
}