import express from "express";
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUser
} from "../controllers/userControllers.js";
const router = express.Router();
import {admin, protect} from "../middlewares/authMiddleware.js";
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);
router.route("/").get(protect,admin,getUsers);

router.route('/:id').delete(protect,admin,deleteUser)

export default router;
