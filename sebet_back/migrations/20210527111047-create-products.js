'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      product_code: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      product_name_tm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      product_name_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      product_preview_image: {
        type: DataTypes.STRING,
      },
      product_image: {
        type: DataTypes.STRING,
      },
      product_description_tm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      product_description_ru: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      product_price: {
        type: DataTypes.REAL,
      },
      product_price_old: {
        type: DataTypes.REAL,
      },
      product_price_tmt: {
        type: DataTypes.REAL,
      },
      product_price_tmt_old: {
        type: DataTypes.REAL,
      },
      product_price_usd: {
        type: DataTypes.REAL,
      },
      product_price_usd_old: {
        type: DataTypes.REAL,
      },
      product_discount: {
        type: DataTypes.REAL,
      },
      currency: {
        type: DataTypes.REAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bannerId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('products');
  },
};
