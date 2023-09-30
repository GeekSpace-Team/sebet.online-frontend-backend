const fs = require('fs');
const multer = require('multer');
// const sharp = require('sharp');
const Op = require('sequelize').Op;
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const decodeBase64Image = require('./../../utils/decodeBase64Image');
const {
  Products,
  Currency,
  Categories,
  Subcategories,
  Brands,
  Stock,
} = require('../../models');

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

const capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.getAllActiveProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit || 20;
  let { offset, keyword, categoryId, subcategoryId, brandId } = req.query;

  var where = {
    isActive: true,
  };
  if (keyword) {
    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);

    where = {
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
        {
          product_code: {
            [Op.eq]: req.query.keyword,
          },
        },
      ],
      isActive: true,
    };
  }

  if (categoryId) where.categoryId = categoryId;
  if (subcategoryId) where.subcategoryId = subcategoryId;
  if (brandId) where.brandId = brandId;

  const products = await Products.findAll({
    where,
    limit,
    offset,
    order: [['updatedAt', 'DESC']],
    include,
  });

  return res.status(200).send(products);
});

exports.getAllNonActiveProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit || 20;
  let { offset, keyword, categoryId, subcategoryId, brandId } = req.query;

  var where = {
    isActive: false,
  };
  if (keyword) {
    let keywordsArray = [];
    keyword = keyword.toLowerCase();
    keywordsArray.push('%' + keyword + '%');
    keyword = '%' + capitalize(keyword) + '%';
    keywordsArray.push(keyword);

    where = {
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
        {
          product_code: {
            [Op.eq]: req.query.keyword,
          },
        },
      ],
      isActive: false,
    };
  }

  if (categoryId) where.categoryId = categoryId;
  if (subcategoryId) where.subcategoryId = subcategoryId;
  if (brandId) where.brandId = brandId;

  const products = await Products.findAll({
    where,
    limit,
    offset,
    order: [['updatedAt', 'DESC']],
    include,
  });

  return res.status(200).send(products);
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const category = await Categories.findOne({
    where: { category_id: req.body.category_id },
  });
  if (!category)
    return next(new AppError('Category did not found with that ID', 404));

  if (req.body.subcategory_id) {
    const subcategory = await Subcategories.findOne({
      where: { subcategory_id: [req.body.subcategory_id] },
    });
    if (!subcategory)
      return next(new AppError('Sub-category did not found with that ID', 404));
    req.body.subcategoryId = subcategory.id;
  }

  const brand = await Brands.findOne({
    where: { brand_id: [req.body.brand_id] },
  });
  if (!brand)
    return next(new AppError('Brand did not found with that ID', 404));

  if (!req.body.stock.stock_quantity)
    return next(new AppError('Please provide stock_quantity', 400));

  req.body.categoryId = category.id;
  req.body.brandId = brand.id;

  const currency = await Currency.findOne();
  req.body.currency = currency.currency_value;

  const newProduct = await Products.create(req.body);

  await Stock.create({
    productId: newProduct.id,
    stock_quantity: req.body.stock.stock_quantity,
  });

  return res.status(201).send(newProduct);
});

exports.editProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findOne({
    where: { product_id: req.params.id },
  });

  if (!product)
    return next(new AppError('Product did not found with that ID', 404));

  const fields = Object.values(req.body).map((el) => el);
  if (fields.includes(''))
    return next(new AppError('Invalid credentials', 400));

  if (req.body.category_id) {
    const category = await Categories.findOne({
      where: { category_id: [req.body.category_id] },
    });
    if (!category)
      return next(
        new AppError('Category did not found with your category_id', 404)
      );
    req.body.categoryId = category.id;
  }

  if (req.body.subcategory_id) {
    const subcategory = await Subcategories.findOne({
      where: { subcategory_id: [req.body.subcategory_id] },
    });
    if (!subcategory)
      return next(
        new AppError('Sub-category did not found with your category_id', 404)
      );
    req.body.subcategoryId = subcategory.id;
  }

  if (req.body.brand_id) {
    const brand = await Brands.findOne({
      where: { brand_id: [req.body.brand_id] },
    });
    if (!brand)
      return next(new AppError('Brand did not found with that ID', 404));
    req.body.brandId = brand.id;
  }

  const currency = await Currency.findOne();
  req.body.currency = currency.currency_value;

  if (req.body.product_price_tmt) {
    req.body.product_price_usd = null;
    req.body.product_price_usd_old = null;
    req.body.product_price_old = null;
    if (req.body.product_discount > 0) {
      req.body.product_price_tmt_old = req.body.product_price_tmt;
      req.body.product_price_tmt =
        (req.body.product_price_tmt_old / 100) *
        (100 - req.body.product_discount);
      req.body.product_price_old = req.body.product_price_tmt_old;
    }
    req.body.product_price = req.body.product_price_tmt;
  }

  if (req.body.product_price_usd) {
    req.body.product_price_tmt = null;
    req.body.product_price_tmt_old = null;
    req.body.product_price_old = null;
    if (req.body.product_discount > 0) {
      req.body.product_price_usd_old = req.body.product_price_usd;
      req.body.product_price_usd =
        (req.body.product_price_usd_old / 100) *
        (100 - req.body.product_discount);
      req.body.product_price_old =
        req.body.product_price_usd_old * req.body.currency;
    }
    req.body.product_price = req.body.product_price_usd * req.body.currency;
  }

  await product.update(req.body);

  if (req.body.stock) {
    if (typeof req.body.stock.stock_quantity != 'number')
      return next(new AppError('stock_quantity must be in number', 400));

    const stock = await Stock.findOne({ where: { productId: product.id } });

    await stock.update({ stock_quantity: req.body.stock.stock_quantity });
  }

  return res.status(200).send(product);
});

exports.editProductStatus = catchAsync(async (req, res, next) => {
  const product = await Products.findOne({
    where: { product_id: req.params.id },
  });
  if (!product)
    return next(new AppError('Product did not found with that ID', 404));

  await product.update({
    isActive: req.body.isActive,
  });

  return res.status(200).send(product);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product_id = req.params.id;
  const product = await Products.findOne({ where: { product_id } });

  if (!product)
    return next(new AppError('Product did not found with that ID', 404));

  if (product.product_image) {
    fs.unlink(`public/${product_id}_product_preview.webp`, function (err) {
      if (err) throw err;
    });
    fs.unlink(`public/${product_id}_product.webp`, function (err) {
      if (err) throw err;
    });
  }

  const stock = await Stock.findOne({ where: { productId: [product.id] } });

  await stock.destroy();
  await product.destroy();

  return res.status(200).send('Successfully Deleted');
});

// Multer Properties
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPhoto = upload.single('photo');

exports.uploadProductImage = catchAsync(async (req, res, next) => {
  if (!req.body.photo.img)
    return next(new AppError('Please provide Product Image', 404));

  const product_id = req.params.id;
  const product = await Products.findOne({ where: { product_id } });

  if (!product)
    return next(new AppError('Product did not found with that ID', 404));

  const product_image = `${product_id}_product.webp`;
  const product_preview_image = `${product_id}_product_preview.webp`;
  const photo = decodeBase64Image(req.body.photo.img);

  // await sharp(photo.data).toFormat('webp').toFile(`public/${product_image}`);

  // await sharp(photo.data)
  //   .toFormat('webp')
  //   .webp({ quality: 90 })
    // .toFile(`public/${product_preview_image}`);

    let img_direction = `./public/`+product_preview_image;
    fs.writeFile(img_direction, photo.data, function(err) { console.log(err) });

    let img_direction2 = `./public/`+product_image;
    fs.writeFile(img_direction2, photo.data, function(err) { console.log(err) });


  const updatedProduct = await product.update({
    product_preview_image,
    product_image,
  });

  return res.status(201).send(updatedProduct);
});
