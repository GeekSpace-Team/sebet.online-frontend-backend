const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getTopProducts,
} = require('../../../controllers/public/productsControllers');

const router = express.Router();

router.get('/',cache.get, getTopProducts, cache.set);

module.exports = router;
