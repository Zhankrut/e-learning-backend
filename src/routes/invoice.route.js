import { Router } from "express";
import { createInvoice, deleteInvoice } from "../controllers/invoice.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-invoice/:courseId").post(authenticate, createInvoice); // Create a new invoice
router.route("/delete-invoice/:invoiceId").delete(authenticate, deleteInvoice); // Delete an invoice

export default router;