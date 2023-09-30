const fs = require('fs');
const { Op } = require('sequelize');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
  Categories,
  Products,
  Stock,
  Brands,
  Categoriesbrands,
} = require('../../models');

exports.addCategory = catchAsync(async (req, res) => {
  const { category_name_tm, category_name_ru } = req.body;

  const newCategory = await Categories.create({
    category_name_tm,
    category_name_ru,
  });

  return res.status(201).send(newCategory);
});

exports.addCategoryBrand = catchAsync(async (req, res, next) => {
  const category = await Categories.findOne({
    where: { category_id: req.params.id },
  });
  if (!category)
    return next(new AppError('Ctegory did not found with that ID', 404));

  const brand = await Brands.findOne({
    where: { brand_id: req.body.brand_id },
  });
  if (!brand)
    return next(new AppError('Brand did not found with brand_id', 404));

  await Categoriesbrands.create({
    brandId: brand.id,
    categoryId: category.id,
  });

  return res.status(201).json({
    msg: 'Successfully added',
  });
});

exports.editCategory = catchAsync(async (req, res, next) => {
  const category = await Categories.findOne({
    where: { category_id: req.params.id },
  });

  if (!category)
    return next(new AppError('Category did not found with that ID', 404));

  const { category_name_tm, category_name_ru } = req.body;
  if (
    typeof category_name_tm !== 'string' ||
    category_name_tm.length < 1 ||
    typeof category_name_ru !== 'string' ||
    category_name_ru.length < 1
  )
    return next(new AppError('Invalid Credentials', 400));

  await category.update({ category_name_tm, category_name_ru });

  return res.status(200).send(category);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category_id = req.params.id;
  const category = await Categories.findOne({ where: { category_id } });

  if (!category)
    return next(new AppError('Category did not found with that ID', 404));

  const products = await Products.findAll({
    where: { categoryId: [category.id] },
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

      await Stock.destroy({ where: { productId: [product.id] } });
      await product.destroy();
    });
  }

  await Categoriesbrands.destroy({ where: { categoryId: [category.id] } });
  await category.destroy();

  return res.status(200).send('Successfully Deleted');
});

exports.deleteCategoryBrand = catchAsync(async (req, res, next) => {
  const { category_id, brand_id } = req.query;

  const category = await Categories.findOne({
    where: { category_id },
  });
  if (!category)
    return next(new AppError('Category did not found with that ID', 404));

  const brand = await Brands.findOne({
    where: { brand_id },
  });
  if (!brand)
    return next(new AppError('Brand did not found with brand_id', 404));

  await Categoriesbrands.destroy({
    where: { [Op.and]: [{ brandId: brand.id }, { categoryId: category.id }] },
  });

  return res.status(200).send('Successfully Deleted');
});
