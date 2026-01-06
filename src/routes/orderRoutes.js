const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  updateOrderPayment
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/status', protect, admin, updateOrderStatus);

router.put('/:id/payment', protect, updateOrderPayment);

module.exports = router;
