const express = require('express');
const cache = require("../../config/node-cache");
const {
  login,
  signup,
  forgotPassword,
  protect,
  verify_code,
  verify_code_forgotten,
} = require('../../controllers/users/authController');
const { getMyCart } = require('../../controllers/users/cartControllers');
const {
  addMyOrders,
  getMyOrders,
  getMyOrderProducts,
} = require('../../controllers/users/ordersControllers');
const {
  getMe,
  updateMyPassword,
  updateMe,
  deleteMe,
} = require('../../controllers/users/usersControllers');

const router = express.Router();

router.patch('/forgot-password', verify_code_forgotten, forgotPassword);

router.post('/signup', verify_code, signup);
router.post('/login', login);
router.get('/my-account', protect, cache.get, getMe, cache.set);
router.patch('/update-me', protect, updateMe);
router.delete('/delete-me', protect, deleteMe);
router.patch('/update-my-password', protect, updateMyPassword);

router.post('/my-cart', getMyCart);

router.get('/my-orders', protect, cache.get, getMyOrders, cache.set);
router.get('/my-order-products/:id', protect, cache.get, getMyOrderProducts, cache.set);
router.post('/my-orders/add', addMyOrders);

module.exports = router;
