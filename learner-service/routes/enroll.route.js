import express from "express";
import {
  enrollToCourse,
  unEnrollFromCourse,
  getMyCourses,
} from "../controllers/enroll.controller.js";
const router = express.Router();

router.post("/get-all", getMyCourses);
router.post("/enroll", enrollToCourse);
router.patch("/unEnroll", unEnrollFromCourse);

export default router;
