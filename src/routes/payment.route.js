import { Router } from "express";
import { createPayment, deletePayment } from "../controllers/payment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/create-payment/:userId/:courseId").post(authenticate, createPayment); // Create a new payment
router.route("/delete-payment/:paymentId").delete(authenticate, deletePayment); // Delete a payment

export default router;