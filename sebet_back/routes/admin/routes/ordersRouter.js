const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getAllOrders,
  getStatistics,
  getOrderProducts,
  changeOrderStatus,
  searchOrders,
  deleteOrderProduct,
  deleteOrder,
  ChangeOrderProductDecrease,
  ChangeOrderProductIncrease
} = require('../../../controllers/admin/ordersControllers');

const router = express.Router();

router.get('/',cache.get, getAllOrders, cache.set);
router.post('/order-products/delete/:id', deleteOrderProduct);
router.delete("/order/delete/:id", deleteOrder)
router.get('/order-products/:id', getOrderProducts);
router.post('/change-order-status/:id', changeOrderStatus);
router.post('/orderProduct/decrease', ChangeOrderProductDecrease);
router.post('/orderProduct/increase', ChangeOrderProductIncrease);

module.exports = router;
