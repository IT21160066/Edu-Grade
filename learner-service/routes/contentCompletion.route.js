import express from "express";
import {
  addCompletion,
  getCompletedCourse,
} from "../controllers/courseCompletion.controller.js";
const router = express.Router();

router.post("/", addCompletion);
router.post("/contents", getCompletedCourse);

export default router;
