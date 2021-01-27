import express, { Router } from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/all-users/:id").get(protect, getAllUsers);

export default router;
