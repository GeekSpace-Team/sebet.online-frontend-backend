'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    static associate({ Products, Categories }) {
      this.hasMany(Products, {
        foreignKey: 'brandId',
        as: 'brand_products',
      });
      this.belongsToMany(Categories, {
        through: 'Categoriesbrands',
        as: 'brand_categories',
        foreignKey: 'brandId',
      });
    }
  }
  Brands.init(
    {
      brand_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      brand_name_tm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      brand_name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      brand_preview_image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'brands',
      modelName: 'Brands',
    }
  );
  return Brands;
};
