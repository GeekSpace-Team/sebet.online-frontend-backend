'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banners extends Model {
    static associate({ Products }) {
      this.hasMany(Products, {
        foreignKey: 'bannerId',
        as: 'banner_products',
      });
    }
  }

  Banners.init(
    {
      banner_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      banner_image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'banners',
      modelName: 'Banners',
    }
  );

  return Banners;
};
