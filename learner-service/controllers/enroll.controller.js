import Enrollment from "../models/enrollmentModel.js";
import { SendEmail, SendSms } from "./notification.controller.js";
import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";

const enrollToCourse = tryCatch(async (req, res) => {
  const { user, course } = req.body;

  if (!course || !user) throw new CustomError("Data not provided!", 404);

  // TODO: we cannot populate these properties
  // Check if user is already enrolled
  const alreadyEnrolled = await Enrollment.findOne({
    userId: user._id,
    courseId: course._id,
  });

  if (alreadyEnrolled) throw new CustomError("Already enrolled!", 201);

  const enrollment = await Enrollment.create({
    userId: user._id,
    courseId: course._id,
    courseName: course.courseName,
    courseDescription: course.courseDescription,
    author: course.author,
  });

  if (!enrollment) throw new CustomError("Enrollment unsuccessful!", 500);

  SendEmail(user.email); //send email notification
  SendSms(user.mobile); //send sms notification

  res.status(200).json(enrollment);
});

const unEnrollFromCourse = tryCatch(async (req, res) => {
  const { userId, courseId } = req.body;

  const unEnrolled = await Enrollment.findOneAndDelete({
    userId: userId,
    course: courseId,
  });

  if (!unEnrolled) throw new CustomError("Un-enrollment unsuccessful!", 500);
});

const getMyCourses = tryCatch(async (req, res) => {
  const { userId } = req.body;

  if (!userId) throw new CustomError("User id not defined!", 404);

  //   const response = await fetch("http://localhost:8000/api/user/" + userId, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log(response);
  //   res.status(200).json(response);

  // TODO: we cannot populate these properties

  const courses = await Enrollment.find({ userId: userId });

  if (!courses.length) throw new CustomError("Resources not found!", 404);

  res.status(200).json(courses);
});

export { enrollToCourse, unEnrollFromCourse, getMyCourses };
