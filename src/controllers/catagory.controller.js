import { Category } from "../models/catagory.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


// create category
const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        throw new ApiError(400, "Category already exists");
    }

    const category = await Category.create({
        name,
        description
    });

    if (!category) {
        throw new ApiError(400, "Category can not be created");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, category, "Category created successfully")
        );

});

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
const deleteCatagory = asyncHandler(async (req, res) => {
    const { catagoryId } = req.params;

    if (!catagoryId) {
        throw new ApiError(400, "Invalid course ID");
    }
    if (!isValidObjectId(catagoryId)) {
        throw new ApiError(400, "Invalid course ID");
    }

    const deletedCatagory = await Category.findByIdAndDelete(catagoryId);

    if (!deletedCatagory) {
        throw new ApiError(404, "Category can not be deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedCatagory, "Category deleted successfully"));
});

export {
    createCategory,
    getAllCategories,
    deleteCatagory
}
