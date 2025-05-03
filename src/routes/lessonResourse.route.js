import { Router } from "express";
import {
    createLessonResource,
    getAllLessonResources,
    updateLessonResource,
    deleteLessonResource
} from "../controllers/lessonResourse.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-resource/:lessonId").post(authenticate, createLessonResource); // Create a lesson resource
router.route("/get-resources/:lessonId").get(authenticate, getAllLessonResources); // Get all lesson resources for a lesson
router.route("/update-resource/:lessonId/:lessonResouceId").put(authenticate, updateLessonResource); // Update a lesson resource
router.route("/delete-resource/:lessonResouceId").delete(authenticate, deleteLessonResource); // Delete a lesson resource

export default router;