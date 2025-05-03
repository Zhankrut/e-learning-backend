import { Router } from "express";
import {
    createCertificate,
    deleteCertificate,
    getUserCertificates
} from "../controllers/certificate.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-certificate/:courseId/:userId").post(authenticate, createCertificate); // Create a certificate
router.route("/delete-certificate/:certificateId").delete(authenticate, deleteCertificate); // Delete a certificate
router.route("/get-certificates/:userId").get(authenticate, getUserCertificates); // Get all certificates for a user

export default router;