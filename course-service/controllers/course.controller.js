import { tryCatch } from "../utils/tryCatchWrapper.js";
import { CustomError } from "../exceptions/baseException.js";
import Course from "../models/course.model.js";
import { stripe } from "../server.js";
import axios from "axios";

const addCourse = tryCatch(async (req, res) => {
  const { courseName, courseDescription, price, author, rating, duration } =
    req.body;

  if (!courseName || !price) throw new CustomError("Fields are required.", 500);

  const priceObject = await stripe.prices.create({
    currency: "usd",
    unit_amount_decimal: Number(price) * 100,
    product_data: {
      name: courseName,
    },
  });

  if (!priceObject) throw new CustomError("Stipe object creation failed!");

  const newCourse = await Course.create({
    courseName,
    courseDescription,
    stripeId: priceObject.id,
    price: Number(price),
    author,
    rating,
    duration,
  });

  if (!newCourse) throw new CustomError("Course creation failed.", 500);

  res.status(200).json(newCourse);
});

const getCourses = tryCatch(async (_, res) => {
  const courses = await Course.find();

  // const data = await axios.get("http://localhost:8000/api/user/allProfiles");
  // const dataFromOtherAPI = data.data;

  res.status(200).json(courses);
});

const removeCourse = tryCatch(async (req, res) => {
  const { id } = req.params;

  const courses = await Course.findByIdAndDelete(id);

  res.status(200).json(courses);
});

const getCourseById = tryCatch(async (req, res) => {
  const id = req.params.id;

  const course = await Course.findOne({ _id: id }).populate("contents");
  // if (!course) throw new CustomError("Course Not foundaaca.", 404);

  res.status(200).json(course);
});

export { addCourse, getCourses, removeCourse, getCourseById };
