import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  logincontroller,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIN } from "./../middleware/authMidleware.js";

//router object
const router = express.Router();

//routing
// Register || Post Method
router.post("/register", registerController);

//Login ||  Post Method
router.post("/login", logincontroller);

//Forgot Password ||Post
router.post("/forgot-password", forgotPasswordController);

// Test routes
router.get("/test", requireSignIN, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIN, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected  Admin route auth
router.get("/admin-auth", requireSignIN, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIN, updateProfileController);

//orders
router.get("/orders", requireSignIN, getOrdersController);

//all orders
router.get("/all-orders", requireSignIN, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIN,
  isAdmin,
  orderStatusController
);

export default router;
