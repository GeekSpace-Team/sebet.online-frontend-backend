'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategories extends Model {
    static associate({ Categories, Products }) {
      this.belongsTo(Categories, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      this.hasMany(Products, {
        foreignKey: 'subcategoryId',
        as: 'subcategory_products',
      });
    }
  }
  Subcategories.init(
    {
      subcategory_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategory_name_tm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      subcategory_name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: 'subcategories',
      modelName: 'Subcategories',
    }
  );
  return Subcategories;
};
