const express = require('express');
const cache = require("../../../config/node-cache");
const {
  getAllBanners,
  getBanner,
} = require('../../../controllers/public/bannerControllers');

const router = express.Router();

router.get('/',cache.get, getAllBanners, cache.set);
router.get('/:id', cache.get, getBanner, cache.set);

module.exports = router;
