import express from "express";
import { getTopLawyers,deleteLawyer, getLawyerById, getLawyers ,reviewLawyer,verifyLawyer} from "../controllers/lawyerController.js";
const router = express.Router();
import {protect,admin} from "../middlewares/authMiddleware.js";

router.route("/").get(getLawyers);
// router.route("/adminCall").get(protect,admin,getLawyers);
router.route("/:id").get(getLawyerById);
router.route("/:id").delete(protect,admin,deleteLawyer);
router.route("/:id/reviews").post(protect,reviewLawyer);
router.route("/verify/:id").put(protect,admin,verifyLawyer)
router.get('/lawyer/top',getTopLawyers)
// router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);

export default router;
        