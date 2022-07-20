'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Histories',
  [
    {
      accountId: 1,
      transaction: 'Depósito',
      value: 3000.00,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    {
      accountId: 2,
      transaction: 'Depósito',
      value: 4600.00,
      createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Histories', null, {}),
};