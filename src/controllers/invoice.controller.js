import { Invoice } from "../models/invoice.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";

// creare a invoice 
const createInvoice = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.user?._id || null;
    const { amount } = req.body;

    if (!userId || userId === null) {
        throw new ApiError(400, " userId not found");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, " invailid userId ");
    }

    if (!courseId) {
        throw new ApiError(400, " cannot get the course id");
    }

    const course = await Course.findById(courseId);
    if (!course) {
        throw new ApiError(404, " course not found");
    }
    //TODO: write a function to check if the user is enrolled in the course
    // and what is the status of the payment and enrollment 
    const invoice = await Invoice.create({
        userId,
        courseId,
        amount,
        status: "paid",
    });

    if (!invoice) {
        throw new ApiError(404, " invoice cannot be created");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, invoice, " the invoice has seccessfully created")
        );
});

// delete a invoice 
const deleteInvoice = asyncHandler(async (req, res) => {
    const { invoiceId } = req.params;
    const { userId } = req.user?._id || null;

    if (!userId || userId === null) {
        throw new ApiError(400, " userId not found");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, " invailid userId ");
    }

    const user = await User.findById(userId).select("role");
    if(!user) {
        throw new ApiError(404, " user not found");
    }
    if(user.role !== "admin") {
        throw new ApiError(403, " you are not allowed to delete this invoice");
    }

    if (!invoiceId) {
        throw new ApiError(400, " cannot get the invoice id");
    }

    const invoice = await Invoice.findByIdAndDelete(invoiceId);
    if (!invoice) {
        throw new ApiError(404, " invoice not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, invoice, " the invoice has seccessfully deleted")
        );
});

export {
    createInvoice,
    deleteInvoice
}