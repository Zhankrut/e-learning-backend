import { Course } from '../models/course.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isValidObjectId } from 'mongoose';
import { Catagory } from "../models/catagory.model.js";
import { User } from "../models/user.model.js";



// create course

const createCourse = asyncHandler(async (req, res) => {
    const { title, description, price, category } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400, "The user cannot be found");
    }

    if ([title, description, price, category].some(field => !field || field.toString().trim() === "")) {
        throw new ApiError(400, "All fields (title, description, price, category) are required");
    }

    // ✅ Validate that the category exists in the DB
    const existingCategory = await Catagory.findById(category);
    if (!existingCategory) {
        throw new ApiError(404, "The specified category does not exist");
    }
    // TODO: write aggregation pipeline to get the instructor name and category name
    const course = await Course.create({
        title,
        description,
        price,
        category,   // this is only temporary , we will update it later to get the category name from the DB
        instructor: [userId] // this is only temporary , we will update it later to get the instructor name from the DB
    });

    if (!course) {
        throw new ApiError(500, "The course could not be created");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, course, "The course has been created successfully")
        );
});


// get all courses
const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find();

    if (!courses || courses.length === 0) {
        throw new ApiError(404, "No courses found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, courses, "Courses retrieved successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid course ID");
    }

    const course = await Course.findByIdAndDelete(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Course deleted successfully"));
}
);

// update course 
const updateCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { title, description, price, category } = req.body;

    if ([title, description, price, category].some(field => !field || field.toString().trim() === "")) {
        throw new ApiError(400, "All fields (title, description, price, category) are required");
    }

    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid course ID");
    }

    const course = await Course.findByIdAndUpdate(courseId,
        {
            title,
            description,
            price,
            category
        },
        { new: true }
    );

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, course, "Course updated successfully"));
});


export const courseController = {
    createCourse,
    getAllCourses,
    deleteCourse,
    updateCourse
};