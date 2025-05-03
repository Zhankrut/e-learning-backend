import { Router } from "express";
import {
    createProfile,
    updateProfile,
    getProfileByUserId,
    deleteProfile
} from "../controllers/profile.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-profile").post(authenticate, createProfile); // Create a new profile
router.route("/update-profile").put(authenticate, updateProfile); // Update an existing profile
router.route("/get-profile").get(authenticate, getProfileByUserId); // Get profile by user ID
router.route("/delete-profile").delete(authenticate, deleteProfile); // Delete a profile

export default router;