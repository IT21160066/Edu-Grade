import mongoose from "mongoose";

const { Schema, model } = mongoose;

const contentSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    contentDescription: {
      type: String,
    },
    type: {
      type: String,
      enum: ["video", "reading"],
    },
    body: {
      type: String,
    },
    source: {
      type: String,
    },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Placed within the main object block
  },
  {
    timestamps: true,
  }
);

const Content = model("Content", contentSchema);

export default Content;
