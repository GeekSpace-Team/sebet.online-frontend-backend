const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getStatistics,
  getDuringStatistics,
} = require('../../../controllers/admin/statisticsControllers');

const router = express.Router();

router.get('/',cache.get, getStatistics, cache.set);
router.post('/during', getDuringStatistics);

module.exports = router;
