'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Clients',
  [
    {
      fullName: 'Jessica',
      email: 'jessica@test.com',
      password: 'password',
    },
    {
      fullName: 'Tainara',
      email: 'tainara@test.com',
      password: 'password',
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Clients', null, {}),
};