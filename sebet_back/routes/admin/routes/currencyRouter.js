const express = require('express');
const cache = require("../../../config/node-cache");
const {
  editCurrency,
  getCurrency,
} = require('../../../controllers/admin/currencyControllers');

const router = express.Router();

router.get('/',cache.get, getCurrency, cache.set);
router.patch('/edit', editCurrency);

module.exports = router;
