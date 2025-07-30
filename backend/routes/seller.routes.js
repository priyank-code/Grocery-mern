import express from "express";
import { isAuthSeller, sellerLogin, sellerLogout } from "../controller/seller.controller.js";
import { authSeller } from "../middleware/auth.seller.js";
const router = express.Router();

router.post("/login", sellerLogin);
router.get("/is-auth", authSeller, isAuthSeller)
router.get("/logout",authSeller, sellerLogout);
export default router;