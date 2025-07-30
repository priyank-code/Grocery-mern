import express from "express";
import { authUser } from "../middleware/auth.user.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controller/order.controller.js";
import { authSeller } from "../middleware/auth.seller.js";
const router = express.Router();

router.post("/cod", authUser, placeOrderCOD)
router.post("/stripe", authUser, placeOrderStripe);
router.get("/user", authUser, getUserOrders)
router.get("/seller", authSeller, getAllOrders)
export default router;