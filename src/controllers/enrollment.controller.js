import { Enrollment } from "../models/enrollment.model";
import { Course } from "../models/course.model";
import { User } from "../models/user.model";
import { Payment } from "../models/payment.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";


// create a enrollment 
const createEnrollment = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
        throw new ApiError(404, "userId and courseId are required");
    }

    if (!isValidObjectId(userId) || !isValidObjectId(courseId)) {
        throw new ApiError(404, "userId or courseId are not valid");
    }

    const enrolment = await Enrollment.create({
        userId,
        courseId
    });
    if (!enrolment) {

        throw new ApiError(404, "enrolment not created");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, enrolment, "enrolment created successfully")

        );

});

// get all enrollments 
const getAllEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find();
    if (!enrollments) {
        throw new ApiError(404, "enrollments not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, enrollments, "enrollments fetched successfully")
        );
});

// update a enrollment 
const updateEnrollment = asyncHandler(async (req, res) => {
    const { enrollmentId } = req.params;

    //TODO: write aggregation pipeline to get the detail of payment if payment is successfull then update 

    if (!enrollmentId) {
        throw new ApiError(404, "enrollmentId is required");
    }
    if (!isValidObjectId(enrollmentId)) {
        throw new ApiError(404, "enrollmentId is not valid");
    }
    const enrolment = await Enrollment.findById(enrollmentId);
    if (!enrolment) {
        throw new ApiError(404, "enrollment not found");
    }

    enrolment.changeStatus(req.body.status);
    await enrolment.save();

    const newEnrolment = await Enrollment.findById(enrollmentId);

    if (!newEnrolment) {
        throw new ApiError(404, "enrollment not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, newEnrolment, "enrollment updated successfully")
        );

});


// delete a enrollment
const deleteEnrollment = asyncHandler(async (req, res) => {
    const { enrollmentId } = req.params;
    if (!enrollmentId) {
        throw new ApiError(404, "enrollmentId is required");
    }
    if (!isValidObjectId(enrollmentId)) {
        throw new ApiError(404, "enrollmentId is not valid");
    }
    const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!enrollment) {
        throw new ApiError(404, "enrollment not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, enrollment, "enrollment deleted successfully")
        );
});


export {
    createEnrollment,
    getAllEnrollments,
    updateEnrollment,
    deleteEnrollment
}
