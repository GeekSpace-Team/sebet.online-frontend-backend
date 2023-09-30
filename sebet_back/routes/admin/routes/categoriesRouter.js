const express = require('express');
const cache = require("../../../config/node-cache");
const {
  addCategory,
  editCategory,
  deleteCategory,
  addCategoryBrand,
  deleteCategoryBrand,
} = require('../../../controllers/admin/categoriesControllers');
const {
  getAllCategories,
} = require('../../../controllers/public/categoriesControllers');

const router = express.Router();

router.get('/',cache.get, getAllCategories, cache.set);

router.post('/add', addCategory);
router.post('/add-brand/:id', addCategoryBrand);
router.patch('/edit/:id', editCategory);
router.delete('/delete/:id', deleteCategory);
router.delete('/delete-brand', deleteCategoryBrand);

module.exports = router;
