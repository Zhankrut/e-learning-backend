import { Certificate } from '../models/certificate.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


// create certificate 
const createCertificate = asyncHandler(async (req, res) => {
});

// delete certificate
const deleteCertificate = asyncHandler(async (req, res) => { });

// get user's all certificates 
const getUserCertificates = asyncHandler(async (req, res) => { });


export {
    createCertificate,
    deleteCertificate,
    getUserCertificates
}