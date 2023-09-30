const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { Categories, Subcategories, Products } = require('../../models');

exports.addSubcategory = catchAsync(async (req, res, next) => {
  const { category_id, subcategory_name_tm, subcategory_name_ru } = req.body;

  const category = await Categories.findOne({
    where: { category_id },
  });
  if (!category)
    return next(new AppError('Category did not found with that ID', 404));

  const newSubcategory = await Subcategories.create({
    categoryId: category.id,
    subcategory_name_tm,
    subcategory_name_ru,
  });

  return res.status(201).send(newSubcategory);
});

exports.editSubcategory = catchAsync(async (req, res, next) => {
  const { subcategory_name_tm, subcategory_name_ru } = req.body;

  const subcategory = await Subcategories.findOne({
    where: { subcategory_id: req.params.id },
  });
  if (!subcategory)
    return next(new AppError('Sub-category did not found with that ID', 404));

  if (
    typeof subcategory_name_tm !== 'string' ||
    subcategory_name_tm.length < 1 ||
    typeof subcategory_name_ru !== 'string' ||
    subcategory_name_ru.length < 1
  )
    return next(new AppError('Invalid Credentials', 400));

  await subcategory.update({
    subcategory_name_tm,
    subcategory_name_ru,
  });

  return res.status(200).send(subcategory);
});

exports.deleteSubcategory = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategories.findOne({
    where: { subcategory_id: req.params.id },
  });

  if (!subcategory)
    return next(new AppError('Sub-category did not found with that ID', 404));

  const products = await Products.findAll({
    where: { subcategoryId: subcategory.id },
  });

  if (products) {
    products.forEach(async (product) => {
      if (product.product_image) {
        fs.unlink(
          `public/${product.product_id}_product_preview.webp`,
          function (err) {
            if (err) throw err;
          }
        );
        fs.unlink(`public/${product.product_id}_product.webp`, function (err) {
          if (err) throw err;
        });
      }

      await Stock.destroy({ where: { productId: product.id } });
      await product.destroy();
    });
  }

  await subcategory.destroy();

  return res.status(200).send('Successfully Deleted');
});
