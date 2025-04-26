import { Comment } from '../models/comment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'; 
import { asyncHandler } from '../utils/asyncHandler.js';
import {Lesson } from '../models/lesson.model.js';
import { User } from '../models/user.model.js';


// create comment 
const createComment = asyncHandler(async (req, res) => {});

// update comment 
const updateComment = asyncHandler(async (req, res) => {});

// delete comment 
const deleteComment = asyncHandler(async (req, res) => {});


export {
    createComment,
    updateComment,
    deleteComment
}