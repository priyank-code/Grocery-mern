import express from "express";
import {authUser} from "../middleware/auth.user.js";
import { updateCart } from "../controller/cart.controller.js";
const router = express.Router();

router.post("/update",authUser, updateCart); 
export default router;