import express from "express";
import { registerUser, loginUser, logoutUser} from "../controller/user.controller.js";
import { authUser, isAuth} from "../middleware/auth.user.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authUser, logoutUser)
router.get("/is-auth", authUser, isAuth)
export default router;