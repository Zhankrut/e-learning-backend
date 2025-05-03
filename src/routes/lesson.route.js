import { Router } from "express";
import {
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessons
} from "../controllers/lesson.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-lesson/:moduleId").post(authenticate, createLesson); // Create a new lesson
router.route("/update-lesson/:moduleId/:lessonId").put(authenticate, updateLesson); // Update an existing lesson
router.route("/delete-lesson/:lessonId").delete(authenticate, deleteLesson); // Delete a lesson
router.route("/get-lessons/:moduleId").get(authenticate, getAllLessons); // Get all lessons for a module

export default router;