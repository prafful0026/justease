import express from "express";
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile
} from "../controllers/userControllers.js";
const router = express.Router();
import {admin, protect} from "../middlewares/authMiddleware.js";
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);
router.route("/").get(protect,admin,getUsers);

export default router;
