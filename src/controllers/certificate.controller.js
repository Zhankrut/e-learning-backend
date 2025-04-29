import { Certificate } from '../models/certificate.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { Course } from '../models/course.model.js';


// create certificate 
const createCertificate = asyncHandler(async (req, res) => {
    const { courseId, userId } = req.params;
    const { currentUserID } = req.user?._id || null;

    if (!courseId || !userId) {
        throw new ApiError(400, 'Course ID and User ID are required');
    }
    if (!currentUserID) {
        throw new ApiError(401, 'Unauthorized user');
    }

    // TODO: write code to check the current user is admin or faculty 
    const isAdmin = await User.findById(currentUserID).select('role');
    if (isAdmin.role !== 'admin' && isAdmin.role !== 'faculty') {
        throw new ApiError(403, 'Forbidden: Only admin or faculty can delete certificates');
    }

    //TODO : write code to upload the certificate file to cloudinary and get the URL
    const certificateUrl = 'https://example.com/certificate.pdf'; // Replace with actual URL after uploading to cloudinary

    const certificate = await Certificate.create({
        userId,
        courseId,
        issueDate: new Date(),
        certificateUrl
    });

    if (!certificate) {
        throw new ApiError(500, 'Failed to create certificate');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, certificate, 'Certificate created successfully')
        );

});

// delete certificate
const deleteCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const { currentUserID } = req.user?._id || null;

    if (!certificateId) {
        throw new ApiError(400, 'Certificate ID is required');
    }
    if (!currentUserID) {
        throw new ApiError(401, 'Unauthorized user');
    }

    const isAdmin = await User.findById(currentUserID).select('role');
    if (isAdmin.role !== 'admin' && isAdmin.role !== 'faculty') {
        throw new ApiError(403, 'Forbidden: Only admin or faculty can delete certificates');
    }

    const certificate = await Certificate.findByIdAndDelete(certificateId);
    if (!certificate) {
        throw new ApiError(404, 'Certificate cannot be deleted');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, 'Certificate deleted successfully')
        );
});

// get user's all certificates 
const getUserCertificates = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { currentUserID } = req.user?._id || null;

    if (!userId) {
        throw new ApiError(400, 'User ID is required');
    }
    if (!currentUserID) {
        throw new ApiError(401, 'Unauthorized user');
    }

    const isAdmin = await User.findById(currentUserID).select('role');
    if (isAdmin.role !== 'admin' && isAdmin.role !== 'faculty') {
        throw new ApiError(403, 'Forbidden: Only admin or faculty can delete certificates');
    }
    const certificates = await Certificate.find({ userId });
    if (!certificates) {
        throw new ApiError(404, 'No certificates found for this user');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, certificates, 'Certificates retrieved successfully')
        );
});


export {
    createCertificate,
    deleteCertificate,
    getUserCertificates
}