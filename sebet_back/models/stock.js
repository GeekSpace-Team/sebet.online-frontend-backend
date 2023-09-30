'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate({ Products }) {
      this.belongsTo(Products, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }
  Stock.init(
    {
      stock_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      productId: {
        type: DataTypes.INTEGER,
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'stock',
      modelName: 'Stock',
    }
  );
  return Stock;
};
