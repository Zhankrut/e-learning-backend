import { Payment } from '../models/payment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// create payment
const createPayment = asyncHandler(async (req, res) => { });

// delete payment
const deletePayment = asyncHandler(async (req, res) => { });


export {
    createPayment,
    deletePayment
}
