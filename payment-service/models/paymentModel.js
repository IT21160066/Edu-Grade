import mongoose from "mongoose";

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: Course,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);
export default Payment;
