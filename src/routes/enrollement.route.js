import { Router } from "express";
import {
    createEnrollment,
    getAllEnrollments,
    updateEnrollment,
    deleteEnrollment
} from "../controllers/enrollment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-enrollment/:userId/:courseId").post(authenticate, createEnrollment); // Create a new enrollment
router.route("/get-enrollments").get(authenticate, getAllEnrollments); // Get all enrollments
router.route("/update-enrollment/:enrollmentId").put(authenticate, updateEnrollment); // Update an enrollment
router.route("/delete-enrollment/:enrollmentId").delete(authenticate, deleteEnrollment); // Delete an enrollment

export default router;