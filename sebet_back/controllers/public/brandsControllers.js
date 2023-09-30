const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
  Brands,
  Products,
  Categories,
  Subcategories,
  Stock,
} = require('../../models');

exports.getAllBrands = catchAsync(async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset;

  const brands = await Brands.findAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    include: {
      model: Categories,
      as: 'brand_categories',
    },
  });

  return res.status(200).send(brands);
});

exports.getBrandProducts = catchAsync(async (req, res, next) => {
  const brand = await Brands.findOne({ where: { brand_id: req.params.id } });

  if (!brand)
    return next(new AppError('Brand did not found with that ID', 404));

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
    where: { brandId: brand.id, isActive: true },
    order,
    limit,
    offset,
    include: [
      {
        model: Categories,
        as: 'category',
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
