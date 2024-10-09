import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";
import Content from "../models/content.model.js";
import Course from "../models/course.model.js";

const addContent = tryCatch(async (req, res) => {
  console.log("awfaf");
  const { topic, contentDescription, type, body, source, courseID } = req.body;
  console.log("content body >>", req.body);
  if (!topic)
    throw new CustomError("there should be a topic to the content", 400);
  if (type == "video") {
    if (!source) throw new CustomError("Source field is required.", 400);
  } else {
    if (!body) throw new CustomError("There should be content to read.", 400);
  }
  const course = await Course.findById(courseID);

  if (!course) throw new CustomError("Course not found.", 404);
  const content = await Content.create({
    topic,
    contentDescription,
    type,
    body,
    source,
    courseID,
  });
  console.log("content >>", content);
  course.contents.push(content._id);
  const updated = await course.save();
  res.status(200).json(updated);
});

const getCourse = tryCatch(async (req, res) => {});

export { addContent, getCourse };
