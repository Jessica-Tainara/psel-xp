'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Accounts',
  [
    {
      clientId: 1,
      balance: 3000.00,
    },
    {
      clientId: 2,
      balance: 4600.00,
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Accounts', null, {}),
};