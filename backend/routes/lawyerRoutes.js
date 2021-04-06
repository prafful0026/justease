import express from "express";
import { getLawyerById, getLawyers ,reviewLawyer} from "../controllers/lawyerController.js";
const router = express.Router();
import {protect,admin} from "../middlewares/authMiddleware.js";

router.route("/").get(getLawyers);
// router.route("/adminCall").get(protect,admin,getLawyers);
router.route("/:id").get(getLawyerById);
router.route("/:id/reviews").post(protect,reviewLawyer);


// router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);

export default router;
    