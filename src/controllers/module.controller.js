import {Module} from '../models/module.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {Course} from '../models/course.model.js';

// create module 
const createModule = asyncHandler(async (req, res) => {});

// update module 
const updateModule = asyncHandler(async (req, res) => {}) ;

// delete module
const deleteModule = asyncHandler(async (req, res) => {});

export {
    createModule,
    updateModule,
    deleteModule
}

