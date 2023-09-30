'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate({ Categories, Subcategories, Brands, Stock, Banners }) {
      this.belongsTo(Categories, {
        foreignKey: 'categoryId',
        as: 'category',
      });
      this.belongsTo(Subcategories, {
        foreignKey: 'subcategoryId',
        as: 'subcategory',
      });
      this.belongsTo(Brands, {
        foreignKey: 'brandId',
        as: 'brand',
      });
      this.belongsTo(Banners, {
        foreignKey: 'bannerId',
        as: 'banner',
      });
      this.hasOne(Stock, {
        foreignKey: 'productId',
        as: 'product_stock',
      });
    }
    toJSON() {
      return {
        ...this.get(),
        currency: undefined,
      };
    }
  }
  Products.init(
    {
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
    },
    {
      sequelize,
      tableName: 'products',
      modelName: 'Products',
    }
  );

  Products.beforeCreate(async (product, options) => {
    if (product.product_price_tmt) {
      if (product.product_discount > 0) {
        product.product_price_tmt_old = product.product_price_tmt;
        product.product_price_tmt =
          (product.product_price_tmt_old / 100) *
          (100 - product.product_discount);
        product.product_price_old = product.product_price_tmt_old;
      }
      product.product_price = product.product_price_tmt;
    }

    if (product.product_price_usd) {
      if (product.product_discount > 0) {
        product.product_price_usd_old = product.product_price_usd;
        product.product_price_usd =
          (product.product_price_usd_old / 100) *
          (100 - product.product_discount);
        product.product_price_old =
          product.product_price_usd_old * product.currency;
      }
      product.product_price = product.product_price_usd * product.currency;
    }
  });

  return Products;
};
