import express from "express";
import { upload } from "../config/multer.js";
import { authSeller } from "../middleware/auth.seller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
} from "../controller/product.controller.js";
const router = express.Router();

router.post("/add-product", authSeller, upload.array("image"),addProduct);
router.get("/list", getProducts);
router.get("/:id", getProductById);
router.post("/stock", authSeller, changeStock); 

export default router;
