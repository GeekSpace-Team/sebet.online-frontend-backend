'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    static associate(models) {}
  }
  Currency.init(
    {
      currency_value: DataTypes.REAL,
    },
    {
      sequelize,
      tableName: 'currency',
      modelName: 'Currency',
    }
  );
  return Currency;
};
