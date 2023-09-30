const express = require('express');
const cache = require("../../../config/node-cache");
const {
  addProduct,
  editProduct,
  uploadPhoto,
  uploadProductImage,
  deleteProduct,
  editProductStatus,
  getAllActiveProducts,
  getAllNonActiveProducts,
} = require('../../../controllers/admin/productsControllers');

const router = express.Router();

router.get('/active',cache.get, getAllActiveProducts, cache.set);
router.get('/non-active',cache.get, getAllNonActiveProducts, cache.set);

router.post('/add', addProduct);
router.patch('/edit/:id', editProduct);
router.patch('/edit-status/:id', editProductStatus);
router.delete('/delete/:id', deleteProduct);
router.post('/upload-image/:id', uploadPhoto, uploadProductImage);

module.exports = router;
