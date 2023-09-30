const Op = require('sequelize').Op;
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const {
  Users,
  Products,
  Orders,
  Orderproducts,
  Stock,
} = require('../../models');

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const limit = req.query.limit || 20;
  let { offset, id, user_phone, status } = req.query;
  var where = {};

  if (user_phone) {
    user_phone = '+' + user_phone;
    const user = await Users.findOne({ where: { user_phone } });
    if (user) {
      where = {
        [Op.or]: [
          {
            user_phone,
          },
          {
            userId: user.id,
          },
        ],
      };
    } else {
      where = {
        user_phone,
      };
    }
  }

  if (status) where.status = status;
  if (id) where.id = id;

  const orders = await Orders.findAll({
    where,
    order: [['updatedAt', 'DESC']],
    include: {
      model: Users,
      as: 'user',
    },
    limit,
    offset,
  });

  return res.status(201).send(orders);
});

exports.getOrderProducts = catchAsync(async (req, res, next) => {
  const limit = req.query.limit || 50;
  const offset = req.query.offset;

  const order = await Orders.findOne({
    where: { order_id: req.params.id },
    include: {
      model: Orderproducts,
      as: 'order_products',
      limit,
      offset,
      order:[
        ['orderproduct_id', 'ASC']
      ]
    },
  });

  if (!order) {
    return next(new AppError('Order did not found with that ID', 404));
  }

  let orderProducts = [];

  for (var i = 0; i < order.order_products.length; i++) {
    const product = await Products.findOne({
      where: { product_id: order.order_products[i].productId },
    });

    if (!product)
      return next(
        new AppError(`Product did not found with your ID : ${i} `, 404)
      );

    const {
      product_id,
      product_code,
      product_name_tm,
      product_name_ru,
      product_description_tm,
      product_description_ru,
      product_preview_image,
      product_image,
      product_discount
    } = product;

    const obj = {
      product_id,
      product_code,
      product_name_tm,
      product_name_ru,
      product_description_tm,
      product_description_ru,
      product_preview_image,
      product_image,
      product_discount,
      orderproduct_id:order.order_products[i].orderproduct_id,
      quantity: order.order_products[i].quantity,
      order_price: order.order_products[i].price,
      total_price: order.order_products[i].total_price,
    };

    orderProducts.push(obj);
  }

  return res.status(201).send(orderProducts);
});

exports.ChangeOrderProductDecrease = catchAsync(async (req, res, next) => {
      const {id, count,order_id} = req.body;

      const orderPro = await Orderproducts.findOne({
        where:{
          orderproduct_id:id
        }
      });

      const order = await Orders.findOne({
        where:{
          order_id:order_id
        }
      });

      const total = orderPro.price*count;

      await Orders.update({
        total_price: order.total_price-orderPro.price,
        total_quantity:order.total_quantity-1
      },
      {
        where:{
          order_id:order_id
        }
      }) 

      Orderproducts.update({
        quantity:count,
        total_price:total
      },
      {
        where:{
          orderproduct_id:id
        }
      }).then((data)=>{
        res.json({edited:`quantity ${count}`})
      }).catch((err)=>{
        console.log(err);
        res.json({error:err})
      })
})

exports.ChangeOrderProductIncrease = catchAsync(async (req, res, next) => {
  const {id, count,order_id} = req.body;

  const orderPro = await Orderproducts.findOne({
    where:{
      orderproduct_id:id
    }
  });

  const order = await Orders.findOne({
    where:{
      order_id:order_id
    }
  });

  const total = orderPro.price*count;

  await Orders.update({
    total_price: order.total_price+orderPro.price,
    total_quantity:order.total_quantity+1
  },
  {
    where:{
      order_id:order_id
    }
  }) 

  Orderproducts.update({
    quantity:count,
    total_price:total
  },
  {
    where:{
      orderproduct_id:id
    }
  }).then((data)=>{
    res.json({edited:`quantity ${count}`})
  }).catch((err)=>{
    console.log(err);
    res.json({error:err})
  })
});


exports.changeOrderStatus = catchAsync(async (req, res, next) => {
  const order = await Orders.findOne({
    where: {
      order_id: req.params.id,
    },
    include: {
      model: Orderproducts,
      as: 'order_products',
    },
  });

  if (!order) {
    return next(new AppError('Order did not found with that ID', 404));
  }

  if (req.body.status == 2) {
    for (var i = 0; i < order.order_products.length; i++) {
      const product = await Products.findOne({
        where: { product_id: order.order_products[i].productId },
      });

      const stock = await Stock.findOne({ where: { productId: product.id } });

      await stock.update({
        stock_quantity: stock.stock_quantity - order.order_products[i].quantity,
      });
    }
  }

  await order.update({
    status: req.body.status,
  });

  return res.status(201).send(order);
});

exports.deleteOrderProduct = catchAsync(async (req, res, next) => {
  const orderproduct = await Orderproducts.findOne({
    where: { orderproduct_id: req.params.id },
  });

  const { order_id } = req.body;

  // console.log(orderproduct)
  if (!orderproduct) {
    // return next(new AppError('Order Product did not found with that ID', 404));
  }

  const order = await Orders.findOne({
    where:{
      order_id:order_id
    }
  });
  // console.log(order);
  const total = order.total_price - orderproduct.total_price;
  const total_quantity = order.total_quantity-orderproduct.quantity
  console.log("total",total);
  console.log(order.total_price,"-",orderproduct.total_price);
  console.log(order.total_quantity,"-",orderproduct.quantity);

  await Orders.update({
    total_price: total,
    total_quantity:total_quantity
  },
  {
    where:{
      order_id:order_id
    }
  }) 

   Orderproducts.destroy({
    where:{
      orderproduct_id: req.params.id 
    }
  }).then((data)=>{
    res.status(200).json({ msg: 'Successfully Deleted' });
  }).catch((err)=>{
    console.log(err);
    res.json({err:err})
  })
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  


  const order = await Orders.findOne({ where: { id: req.params.id } });

  // await order.update({
  //   total_price: order.total_price - orderproduct.total_price,
  // });
  await Orderproducts.destroy({
    where:{
      orderId:req.params.id
    }
  })
  
  if (order){
    Orders.destroy({
      where:{
        id:req.params.id
      }
    }).then(()=>{
      return res.status(200).json({ msg: 'Successfully Deleted' });
    }).catch((err)=>{
      console.log(err);
      res.json({err:"err",error:err})
    })
  }

 

});