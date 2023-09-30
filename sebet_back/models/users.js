'use strict';
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate({ Orders }) {
      this.hasMany(Orders, {
        foreignKey: 'userId',
        as: 'user_orders',
      });
    }
    toJSON() {
      return {
        ...this.get(),
        user_password: undefined,
      };
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      user_address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'Users',
    }
  );

  Users.beforeCreate(async (user, options) => {
    user.user_password = await bcrypt.hash(user.user_password, 12);
  });

  return Users;
};
