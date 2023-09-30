const express = require('express');
const { sendMyMail } = require('../../controllers/public/contactusControllers');
const router = express.Router();

router.post('/contact-us', sendMyMail);
router.use('/banners', require('./routes/bannersRouter'));
router.use('/brands', require('./routes/brandsRouter'));
router.use('/categories', require('./routes/categoriesRouter'));
router.use('/sub-categories', require('./routes/subcategoriesRouter'));
router.use('/products', require('./routes/productsRouter'));
router.use('/top-products', require('./routes/topProductsRouter'));

module.exports = router;
