const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getSubcategoryProducts,
} = require('../../../controllers/public/subcategoriesControllers');

const router = express.Router();

router.get('/products/:id',cache.get, getSubcategoryProducts, cache.set);

module.exports = router;
