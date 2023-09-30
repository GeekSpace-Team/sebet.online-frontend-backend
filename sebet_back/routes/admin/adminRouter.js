const express = require('express');
const router = express.Router();
const {
  login,
  protect,
  updateMe,
} = require('./../../controllers/admin/adminControllers');

router.post('/login', login);
router.post('/update-me', protect, updateMe);
router.use('/banners', protect, require('./routes/bannersRouter'));
router.use('/brands', protect, require('./routes/brandsRouter'));
router.use('/categories', protect, require('./routes/categoriesRouter'));
router.use('/sub-categories', protect, require('./routes/subcategoriesRouter'));
router.use('/products', protect, require('./routes/productsRouter'));
router.use('/currency', protect, require('./routes/currencyRouter'));
router.use('/orders', protect, require('./routes/ordersRouter'));
router.use('/statistics', protect, require('./routes/statisticsRouter'));
router.use('/users', protect, require('./routes/usersRouter'));

module.exports = router;
