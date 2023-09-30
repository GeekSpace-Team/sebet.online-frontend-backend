const Op = require('sequelize').Op;
const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const { sendStatsEmail } = require('./../../utils/email');
const { Orders } = require('../../models');

exports.getStatistics = catchAsync(async (req, res, next) => {
  const TODAY = new Date().setHours(0, 0, 0, 0);

  const today = await Orders.sum('total_price', {
    where: {
      updatedAt: { [Op.gte]: TODAY },
      status: 2,
    },
  });

  const THIS_WEEK = new Date();
  const day = THIS_WEEK.getUTCDay();
  const date = THIS_WEEK.getUTCDate();
  THIS_WEEK.setDate(date - day + 1);
  THIS_WEEK.setHours(0, 0, 0, 0);

  const week = await Orders.sum('total_price', {
    where: {
      updatedAt: { [Op.gte]: THIS_WEEK },
      status: 2,
    },
  });

  const THIS_MONTH = new Date();
  THIS_MONTH.setDate(1);
  THIS_MONTH.setTime(0, 0, 0, 0);

  const month = await Orders.sum('total_price', {
    where: {
      updatedAt: { [Op.gte]: THIS_MONTH },
      status: 2,
    },
  });

  var todayOrders = {};

  var { count } = await Orders.findAndCountAll({
    where: { updatedAt: { [Op.gte]: TODAY } },
  });
  todayOrders.all = count;

  var { count } = await Orders.findAndCountAll({
    where: {
      updatedAt: { [Op.gte]: TODAY },
      status: 2,
    },
  });
  todayOrders.done = count;

  var monthOrders = {};

  var { count } = await Orders.findAndCountAll({
    where: { updatedAt: { [Op.gte]: THIS_MONTH } },
  });
  monthOrders.all = count;

  var { count } = await Orders.findAndCountAll({
    where: {
      updatedAt: { [Op.gte]: THIS_MONTH },
      status: 2,
    },
  });
  monthOrders.done = count;

  return res.status(201).json({
    today,
    week,
    month,
    todayOrders,
    monthOrders,
  });
});

exports.getDuringStatistics = catchAsync(async (req, res, next) => {
  const { from, until, email } = req.body;

  if (!from || !until)
    return next(new AppError('Please provide both dates', 400));

  const stats = await Orders.sum('total_price', {
    where: {
      updatedAt: {
        [Op.gte]: from,
        [Op.lte]: until,
      },
      status: 2,
    },
  });

  if (email) {
    await sendStatsEmail({
      from,
      until,
      stats,
    });
  }

  return res.status(201).json({ stats });
});
