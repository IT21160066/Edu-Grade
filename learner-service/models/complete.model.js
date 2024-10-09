import mongoose from "mongoose";

const { Schema, model } = mongoose;

const completeContent = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  contentID: {
    type: Schema.Types.ObjectId,
    ref: "Content",
  },
});

export default model("CompleteContent", completeContent);
