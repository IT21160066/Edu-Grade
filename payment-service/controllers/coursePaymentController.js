import { CustomError } from "../exceptions/baseException.js";
import CoursePayment from "../models/coursePayementModel.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";

const savePayment = tryCatch(async (req, res) => {
  console.log(req.body);
  const { courseId, courseName, author, userId, name, email, amount } =
    req.body;

  if (
    !courseId ||
    !courseName ||
    !author ||
    !userId ||
    !name ||
    !email ||
    !amount
  ) {
    throw new CustomError("All fields are required", 404);
  }

  const payment = await CoursePayment.create({
    courseId,
    courseName,
    author,
    userId,
    name,
    email,
    amount,
  });

  if (!payment) throw new CustomError("Payment unSuccessful!");

  res.status(200).json(payment);
});

const getAllPayments = tryCatch(async (req, res) => {
  const payments = await CoursePayment.find().lean();

  if (!payments) return res.status(400).json({ message: "No payments found" });

  res.json(payments);
});

export { savePayment, getAllPayments };
