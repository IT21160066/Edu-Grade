import { tryCatch } from "../utils/tryCatchWrapper.js";
import ContentCompletion from "../models/complete.model.js";
import { CustomError } from "../exceptions/baseException.js";

const addCompletion = tryCatch(async (req, res) => {
  const { userId, courseId, contentID } = req.body;

  if (!userId || !courseId || !contentID)
    throw new CustomError("Fields are required!", 500);

  const complete = await ContentCompletion.create({
    userId,
    courseId,
    contentID,
  });

  if (!complete) throw new CustomError("Content completion Failed!", 500);

  res.status(200).json(complete);
});

const getCompletedCourse = tryCatch(async (req, res) => {
  const { userId, courseId } = req.body;

  const completedContents = await ContentCompletion.find({ userId, courseId });

  if (completedContents.length == 0)
    throw new CustomError("Resource not found!", 404);

  res
    .status(200)
    .json({ data: completedContents, metaData: completedContents.length });
});

export { addCompletion, getCompletedCourse };
