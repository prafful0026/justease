import express from "express";
import { authUser,getUserProfile } from "../controllers/userControllers.js";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";

router.post('/login',authUser) 
router.route('/profile').get(protect,getUserProfile)    

export default router;
