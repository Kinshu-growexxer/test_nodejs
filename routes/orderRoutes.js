const express = require("express");
const router = express.Router();
const {
  placeOrder,
  updateOrderStatus,
  getOrder,
  getOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

// Place a new order
router.post("/", protect, placeOrder);

// Update order status
router.patch("/:id", protect, updateOrderStatus);

// Get order details by ID
router.get("/:id", protect, getOrder);

// List all orders with filtering and pagination
router.get("/", protect, getOrders);

module.exports = router;
