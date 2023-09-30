const { Products, Categories, Subcategories, Brands, Stock } = require('../../models');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');

exports.getSubcategoryProducts = catchAsync(async (req, res, next) => {
  const subcategory = await Subcategories.findOne({
    where: { subcategory_id: req.params.id },
  });

  if (!subcategory)
    return next(new AppError('Sub-category did not found with that ID', 404));

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
    where: { subcategoryId: subcategory.id, isActive: true },
    order,
    limit,
    offset,
    include: [
      {
        model: Categories,
        as: 'category',
      },
      {
        model: Brands,
        as: 'brand',
      },
      {
        model: Stock,
        as: 'product_stock',
      },
    ],
  });

  return res.status(200).send(products);
});
