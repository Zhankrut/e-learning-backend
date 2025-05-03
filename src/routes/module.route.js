import { Router } from "express";
import {
    createModule,
    updateModule,
    getAllModules,
    deleteModule
} from "../controllers/module.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-module/:courseId").post(authenticate, createModule); // Create a new module
router.route("/update-module/:moduleId").put(authenticate, updateModule); // Update an existing module
router.route("/get-modules/:courseId").get(authenticate, getAllModules); // Get all modules for a course
router.route("/delete-module/:moduleId").delete(authenticate, deleteModule); // Delete a module

export default router;