import { Payment } from '../models/payment.model.js';
import { User } from '../models/user.model.js';
import { Course } from '../models/course.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { isValidObjectId } from '../utils/isValidObjectId.js';

// create payment
const createPayment = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.params;
    const { amount, paymentMethod } = req.body;

    // check if user exists
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id");
    }
    if (!isValidObjectId(courseId)) {
        throw new ApiError(400, "Invalid course id");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, "Course not found");
    }


    const payment = await Payment.create({
        userId,
        courseId,
        amount,
        paymentMethod,
        status: "pending"
    });

    payment.updateStatus("completed");


    return res
        .status(200)
        .json(
            new ApiResponse(200, payment, "Payment created successfully")
        );
});

// delete payment
const deletePayment = asyncHandler(async (req, res) => {
    const { paymentId } = req.params;

    // check if payment exists
    if (!isValidObjectId(paymentId)) {
        throw new ApiError(400, "Invalid payment id");
    }

    const payment = await Payment.findByIdAndDelete(paymentId);
    if(!payment){
        throw new ApiError(404, "payment cannot be deleted");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Payment deleted successfully")
        );
});


export {
    createPayment,
    deletePayment
}
