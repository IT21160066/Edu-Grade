import mongoose from "mongoose";

const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
    },
    duration: {
      type: Number,
    },
    courseDescription: {
      type: String,
    },
    stripeId: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

export default Course;
