import express from "express";
import {
  createOrder,
  fetchOrderByUser,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
} from "../../controller/order-controller.js";
const router = express.Router();
router.get("/Orders", fetchOrderByUser);
router.post("/Orders", createOrder);
router.patch("/Orders/:id", updateOrder);
router.delete("/Orders/:id", deleteOrder);
router.get('/Orders/:id',fetchAllOrders);
export default router;
