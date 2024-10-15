import express from "express";
const router = express.Router();
import productController from "../controllers/productController.js";

router.get("/", productController.GET_ALL_PRODUCTS);

router.get("/:id", productController.GET_PRODUCT);

export default router;
