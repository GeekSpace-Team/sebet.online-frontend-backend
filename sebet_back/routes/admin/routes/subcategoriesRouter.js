const express = require('express');
const {
  addSubcategory,
  editSubcategory,
  deleteSubcategory,
} = require('../../../controllers/admin/subcategoriesControllers');

const router = express.Router();

router.post('/add', addSubcategory);
router.patch('/edit/:id', editSubcategory);
router.delete('/delete/:id', deleteSubcategory);

module.exports = router;
