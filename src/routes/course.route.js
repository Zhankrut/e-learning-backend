import { Router } from "express";
import {
    createCourse,
    getAllCourses,
    deleteCourse,
    updateCourse
} from "../controllers/course.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-course").post(authenticate, createCourse); // Create a new course
router.route("/get-courses").get(authenticate, getAllCourses); // Get all courses
router.route("/delete-course/:courseId").delete(authenticate, deleteCourse); // Delete a course
router.route("/update-course/:courseId").put(authenticate, updateCourse); // Update a course

export default router;