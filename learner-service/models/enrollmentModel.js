import mongoose from "mongoose";

const { Schema, model } = mongoose;

const enrollmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    courseName: {
      type: String,
    },
    author: {
      type: String,
    },
    courseDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Enrollment", enrollmentSchema);
