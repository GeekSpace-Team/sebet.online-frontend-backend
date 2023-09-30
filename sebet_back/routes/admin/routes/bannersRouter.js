const express = require('express');
const cache = require("../../../config/node-cache");
const {
  uploadPhoto,
  uploadBannerImage,
  addBanner,
  editBanner,
  deleteBanner,
  addBannerProduct,
  deleteBannerProduct,
} = require('../../../controllers/admin/bannerControllers');
const {
  getAllBanners,
  getBanner,
} = require('../../../controllers/public/bannerControllers');

const router = express.Router();

router.get('/', cache.get,getAllBanners,cache.set);
router.get('/:id',cache.get, getBanner, cache.set);

router.post('/add', addBanner);
router.post('/add-product/:id', addBannerProduct);
router.post('/delete-product/:id', deleteBannerProduct);
router.delete('/delete/:id', deleteBanner);
router.post('/upload-image/:id', uploadPhoto, uploadBannerImage);

module.exports = router;
