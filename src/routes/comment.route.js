import { Router } from "express";
import {
    createComment,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-comment/:lesson").post(authenticate, createComment); // Create a new comment
router.route("/update-comment/:commentId").put(authenticate, updateComment); // Update an existing comment
router.route("/delete-comment/:commentId").delete(authenticate, deleteComment); // Delete a comment

export default router;