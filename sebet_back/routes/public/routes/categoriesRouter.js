const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getAllCategories,
  getCategoryProducts,
} = require('../../../controllers/public/categoriesControllers');

const router = express.Router();

router.get('/',cache.get, getAllCategories, cache.set);
router.get('/products/:id',cache.get, getCategoryProducts, cache.set);

module.exports = router;
