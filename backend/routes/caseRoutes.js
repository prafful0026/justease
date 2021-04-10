import express from "express";
import {createCase,userCases} from "../controllers/caseControllers.js";
const router = express.Router();
import { protect} from "../middlewares/authMiddleware.js";




router.route("/").post(protect,createCase);
router.route("/user/cases").get(protect,userCases);

// router.post("/login", authUser);
// router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);
// router.route("/").get(protect,admin,getUsers);

// router.route('/:id').delete(protect,admin,deleteUser)

export default router;
