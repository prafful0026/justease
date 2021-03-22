import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} from "../controllers/userControllers.js";
const router = express.Router();
import {protect} from "../middlewares/authMiddleware.js";
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);

export default router;
