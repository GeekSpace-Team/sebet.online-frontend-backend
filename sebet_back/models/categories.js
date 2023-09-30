'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate({ Products, Brands, Subcategories }) {
      this.hasMany(Products, {
        foreignKey: 'categoryId',
        as: 'category_products',
      });
      this.hasMany(Subcategories, {
        foreignKey: 'categoryId',
        as: 'category_subcategories',
      });
      this.belongsToMany(Brands, {
        through: 'Categoriesbrands',
        as: 'category_brands',
        foreignKey: 'categoryId',
      });
    }
  }
  Categories.init(
    {
      category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      category_name_tm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      category_name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: 'categories',
      modelName: 'Categories',
    }
  );
  return Categories;
};
