const express = require('express');
const cache = require("../../../config/node-cache");
const {
  addBrand,
  editBrand,
  deleteBrand,
  uploadBrandImage,
  uploadPhoto,
  addBrandCategory,
  deleteBrandCategory,
} = require('../../../controllers/admin/brandsControllers');
const {
  getAllBrands,
} = require('../../../controllers/public/brandsControllers');

const router = express.Router();

router.get('/', cache.get, getAllBrands, cache.set);

router.post('/add', addBrand);
router.post('/add-category/:id', addBrandCategory);
router.patch('/edit/:id', editBrand);
router.delete('/delete/:id', deleteBrand);
router.delete('/delete-category', deleteBrandCategory);
router.post('/upload-image/:id', uploadPhoto, uploadBrandImage);

module.exports = router;
