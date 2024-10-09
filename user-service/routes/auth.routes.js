import express from "express";
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  getAllProfiles,
  updateUserProfile,
  deleteUserProfile,
  deleteUser,
  userById,
  login,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", login);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.get("/allProfiles", getAllProfiles);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);
router.delete("/:id", deleteUser);
router.post("/:id", userById);

export default router;
