const {
  Categories,
  Products,
  Brands,
  Subcategories,
  Stock,
} = require('../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset;

  const categories = await Categories.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    include: [
      {
        model: Brands,
        as: 'category_brands',
      },
      {
        model: Subcategories,
        as: 'category_subcategories',
      },
    ],
  });

  return res.status(200).json(categories);
});

exports.getCategoryProducts = catchAsync(async (req, res, next) => {
  const category = await Categories.findOne({
    where: { category_id: req.params.id },
  });

  if (!category)
    return next(new AppError('Category did not found with that ID', 404));

  const limit = req.query.limit || 20;
  const offset = req.query.offset;
  const sort = req.query.sort;

  var order;
  if (sort == 1) {
    order = [['product_price', 'DESC']];
  } else if (sort == 0) {
    order = [['product_price', 'ASC']];
  } else order = [['updatedAt', 'DESC']];

  const products = await Products.findAll({
    where: { categoryId: category.id, isActive: true },
    order,
    limit,
    offset,
    include: [
      {
        model: Brands,
        as: 'brand',
      },
      {
        model: Subcategories,
        as: 'subcategory',
      },
      {
        model: Stock,
        as: 'product_stock',
      },
    ],
  });

  return res.status(200).send(products);
});
