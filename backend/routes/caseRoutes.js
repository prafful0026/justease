import express from "express";
import {createCase,userCases,deleteCase, acceptCase} from "../controllers/caseControllers.js";
const router = express.Router();
import { protect} from "../middlewares/authMiddleware.js";




router.route("/").post(protect,createCase);
router.route("/").get(protect,userCases);
router.route("/:id").delete(protect,deleteCase);
router.route("/:id").put(protect,acceptCase)


// router.post("/login", authUser);
// router.route("/profile").get(protect, getUserProfile).put(protect,updateUserProfile);
// router.route("/").get(protect,admin,getUsers);

// router.route('/:id').delete(protect,admin,deleteUser)

export default router;
