import express from "express";
import { makePayment } from "../controllers/paymentController.js";
import {
  getAllPayments,
  savePayment,
} from "../controllers/coursePaymentController.js";
const router = express.Router();

router.post("/", makePayment);
router.post("/save", savePayment);
router.get("/all", getAllPayments);

export default router;
