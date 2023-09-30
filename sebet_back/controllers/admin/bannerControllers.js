// const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const decodeBase64Image = require('./../../utils/decodeBase64Image');
const { Banners, Products } = require('../../models');

exports.addBanner = catchAsync(async (req, res, next) => {
  const newBanner = await Banners.create({ banner_products: [] });

  return res.status(201).send(newBanner);
});

exports.addBannerProduct = catchAsync(async (req, res, next) => {
  const banner = await Banners.findOne({
    where: { banner_id: req.params.id },
  });
  if (!banner)
    return next(new AppError('Banner did not found with that ID', 404));

  const product = await Products.findOne({
    where: { product_id: req.body.product_id },
  });
  if (!product)
    return next(new AppError('Product did not found with product_id', 404));
  
  await product.update({ bannerId: banner.id });

  return res.status(201).json({
    msg: 'Successfully Added',
  });
});

exports.deleteBannerProduct = catchAsync(async (req, res, next) => {
  const banner = await Banners.findOne({
    where: { banner_id: req.params.id },
  });
  if (!banner)
    return next(new AppError('Banner did not found with that ID', 404));

  const product = await Products.findOne({
    where: { product_id: req.body.product_id },
  });
  if (!product)
    return next(new AppError('Product did not found with product_id', 404));

  await product.update({ bannerId: null });

  return res.status(200).json({
    msg: 'Successfully Deleted',
  });
});

exports.deleteBanner = catchAsync(async (req, res, next) => {
  const banner_id = req.params.id;
  const banner = await Banners.findOne({ where: { banner_id } });

  if (!banner)
    return next(new AppError('Banner did not found with that ID', 404));

  if (banner.banner_image) {
    fs.unlink(`public/${banner.banner_image}`, function (err) {
      if (err) throw err;
    });
  }

   Products.update({
    isActive:false,
    bannerId:null
  },
  {
    where:{
      bannerId:banner.id
    }
  }).then((data)=>{
     Banners.destroy({
      where:{
        banner_id:banner_id
      }
    }).then((data)=>{
       return res.status(200).send('Successfully Deleted');
    }).catch((err)=>{
      console.log(err);
      res.json({err:err,error:"delete banner"});
    })
  }).catch((err)=>{
    console.log(err);
    res.json({err:err,error:"update bannerid of product"});
  })



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

exports.uploadBannerImage = catchAsync(async (req, res, next) => {
  if (!req.body.photo.img)
    return next(new AppError('Please provide Brand Image', 404));

  const banner_id = req.params.id;
  const banner = await Banners.findOne({ where: { banner_id } });

  if (!banner)
    return next(new AppError('Banner did not found with that ID', 404));

  const banner_image = banner_id+req.body.photo.img_name;
  const photo = decodeBase64Image(req.body.photo.img);

  console.log(req.body,"\n",req.files,"\n",req.body.photo);
  // await sharp(photo.data)
  //   .toFormat('webp')
  //   .webp({ quality: 90 })
  //   .toFile(`public/${banner_image}`);

    
    let img_direction = `./public/`+banner_image;
    fs.writeFile(img_direction, photo.data, function(err) { console.log(err) });

  await banner.update({
    banner_image,
  });

  return res.status(201).send(banner);
});
