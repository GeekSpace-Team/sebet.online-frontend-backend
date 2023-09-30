'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate({ Users, Orderproducts }) {
      this.belongsTo(Users, {
        foreignKey: 'userId',
        as: 'user',
      });
      this.hasMany(Orderproducts, {
        foreignKey: 'orderId',
        as: 'order_products',
      });
    }
  }
  Orders.init(
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER
      },
      total_price: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      payment_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      i_take: DataTypes.BOOLEAN,
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      delivery_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'orders',
      modelName: 'Orders',
    }
  );
  return Orders;
};
