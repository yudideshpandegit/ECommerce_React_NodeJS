import express, { Router } from "express";

import {
  getProducts,
  getProductById,
  createProducts
} from "../controllers/productControllers.js";

import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/create-product").post(protect, createProducts);

export default router;
