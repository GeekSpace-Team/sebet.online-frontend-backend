'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.bulkInsert(
      'currency',
      [
        {
          currency_value: 33.5,
          createdAt: DataTypes.fn('now'),
          updatedAt: DataTypes.fn('now'),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currency', null, {});
  },
};
