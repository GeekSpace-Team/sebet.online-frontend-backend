const { Op } = require('sequelize');
const {
  Products,
  Categories,
  Brands,
  Subcategories,
  Stock,
} = require('../../models');
const catchAsync = require('../../utils/catchAsync');

const fieldsForPublic = [
  'id',
  'product_id',
  'product_code',
  'product_name_tm',
  'product_name_ru',
  'product_preview_image',
  'product_image',
  'product_description_tm',
  'product_description_ru',
  'product_price',
  'product_discount',
  'product_price_old',
];

const include = [
  {
    model: Categories,
    as: 'category',
  },
  {
    model: Subcategories,
    as: 'subcategory',
  },
  {
    model: Brands,
    as: 'brand',
  },
  {
    model: Stock,
    as: 'product_stock',
  },
];

exports.getAllProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit || 20;
  const { offset, sort } = req.query;

  var order;
  if (sort == 1) {
    order = [['product_price', 'DESC']];
  } else if (sort == 0) {
    order = [['product_price', 'ASC']];
  } else order = [['updatedAt', 'DESC']];

  const products = await Products.findAll({
    where: { isActive: true },
    attributes: fieldsForPublic,
    order,
    limit,
    offset,
    include,
  });

  return res.status(200).send(products);
});

exports.getTopProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit || 10;
  const { offset, sort } = req.query;

  var order;
  if (sort == 1) {
    order = [['product_price', 'DESC']];
  } else if (sort == 0) {
    order = [['product_price', 'ASC']];
  } else order = [['updatedAt', 'DESC']];

  const discount = await Products.findAll({
    where: { product_discount: { [Op.gt]: 0 }, isActive: true },
    attributes: fieldsForPublic,
    order,
    limit,
    offset,
    include,
  });

  const newProducts = await Products.findAll({
    where: { isActive: true },
    order: [['updatedAt', 'DESC']],
    attributes: fieldsForPublic,
    order,
    limit,
    include,
  });

  return res.status(200).json({
    data: {
      products_with_discount: discount,
      new_products: newProducts,
    },
  });
});

// Search
const capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.searchProducts = catchAsync(async (req, res, next) => {
  const limit = req.query.limit || 20;
  let { keyword, offset, sort } = req.query;

  var order;
  if (sort == 1) {
    order = [['product_price', 'DESC']];
  } else if (sort == 0) {
    order = [['product_price', 'ASC']];
  } else order = [['updatedAt', 'DESC']];

  let keywordsArray = [];
  keyword = keyword.toLowerCase();
  keywordsArray.push('%' + keyword + '%');
  keyword = '%' + capitalize(keyword) + '%';
  keywordsArray.push(keyword);

  const products = await Products.findAll({
    where: {
      [Op.or]: [
        {
          product_name_tm: {
            [Op.like]: {
              [Op.any]: keywordsArray,
            },
          },
        },
        {
          product_name_ru: {
            [Op.like]: {
              [Op.any]: keywordsArray,
            },
          },
        },
      ],
      isActive: true,
    },
    order,
    limit,
    offset,
  });

  return res.status(200).send(products);
});
