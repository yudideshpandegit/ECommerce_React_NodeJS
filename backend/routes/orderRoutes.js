import express, { Router } from "express";

import { createOrder, getOrderDetails } from '../controllers/orderController.js';

import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/details/:id").get(protect, getOrderDetails);


export default router;
