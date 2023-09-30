const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getAllProducts,
  searchProducts,
} = require('../../../controllers/public/productsControllers');

const router = express.Router();

router.get('/search',cache.get, searchProducts, cache.set);
router.get('/',cache.get, getAllProducts, cache.set);

module.exports = router;
