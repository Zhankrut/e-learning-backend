import { Comment } from '../models/comment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Lesson } from '../models/lesson.model.js';
import { User } from '../models/user.model.js';
import { isValidObjectId } from 'mongoose';


// create comment 
const createComment = asyncHandler(async (req, res) => {
    const { lesson } = req.params;
    const { userId } = req.user?._id;
    const comment = req.body;

    if (!comment.trim().length() === 0) {
        throw new ApiError(404, " comment is empty");
    }

    if (!lesson || !userId) {
        throw new ApiError(404, " userId or lessonid not provided");
    }

    const createComment = await Comment.create({
        comment,
        lesson,
        owner: userId
    });

    if (!createComment) {
        throw new ApiError(404, " comment cannot be created");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, createComment, " the has seccessfully created")
        );


});

// update comment 
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user?._id || null;
    const { updatedComment } = req.body;

    if (!userId || userId === null) {
        throw new ApiError(400, " userId not found");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, " invailid userId ");
    }

    if (!commentId) {
        throw new ApiError(400, " cannot get the comment id");
    }

    const comment = await Comment.findById(commentId);

    if (comment.owner === userId) {
        comment.comment = updatedComment;

        comment.save(validateBeforeSave = false);

        const newComment = await Comment.findById(commentId);

        if (!newComment) {
            throw new ApiError(400, " cannot update the commnet ");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, newComment, " the comment has been successfully updated")
            );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(400, {}, " the user is not owner of the comment ")
            );
    }
});

// delete comment 
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user?._id || null;


    if (!userId || userId === null) {
        throw new ApiError(400, " userId not found");
    }

    if (!commentId) {
        throw new ApiError(400, " cannot get the comment id");
    }

    const comment = await Comment.findById(commentId);

    if (comment.owner === userId) {
        const newComment = await Comment.findByIdAndDelete(commentId);

        if (!newComment) {
            throw new ApiError(400, " cannot delete the commnet ");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, newComment, " the comment has been successfully deleted")
            );
    } else {
        return res
            .status(200)
            .json(
                new ApiResponse(400, {}, " the user is not owner of the comment ")
            );
    }
});


export {
    createComment,
    updateComment,
    deleteComment
}