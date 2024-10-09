import express from "express";
const router = express.Router();
import { addContent, getCourse } from "../controllers/content.controller.js";

router.post("/", addContent);
router.get("/", getCourse);

export default router;
