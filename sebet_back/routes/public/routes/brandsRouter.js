const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getAllBrands,
  getBrandProducts,
} = require('../../../controllers/public/brandsControllers');

const router = express.Router();

router.get('/',cache.get, getAllBrands, cache.set);
router.get('/products/:id',cache.get, getBrandProducts, cache.set);

module.exports = router;
