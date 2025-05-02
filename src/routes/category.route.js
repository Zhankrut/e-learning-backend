import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    deleteCatagory
} from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-category").post(authenticate, createCategory);
router.route("/get-categories").get( getAllCategories);
router.route("/delete-category/:catagoryId").delete(authenticate, deleteCatagory);


export default router;