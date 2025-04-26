import { Category } from "../models/catagory.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


// create category
const createCategory = asyncHandler(async (req, res) => {});

// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
        throw new ApiError(404, "No categories found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, categories, "Categories retrieved successfully"));
});

// delete category 
const deleteCatagory = asyncHandler(async (req, res) => {});

export {
    createCategory,
    getAllCategories,
    deleteCatagory
}
