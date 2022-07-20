'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Assets',
  [
    {
      name: 'JTSA',
      qtd: 100,
      price: 70.00,
    },
    {
      name: 'PVSA',
      qtd: 100.00,
      price: 75,
    },
    {
      name: 'SCSA',
      qtd: 120,
      price: 84.50,
    },
    {
      name: 'JETS',
      qtd: 100,
      price: 70.00,
    },
    {
      name: 'VVSA',
      qtd: 100.00,
      price: 75,
    },
    {
      name: 'PSFA',
      qtd: 120,
      price: 84.50,
    },
    {
      name: 'ACSA',
      qtd: 100,
      price: 70.00,
    },
    {
      name: 'SLOS',
      qtd: 100.00,
      price: 75,
    },
    {
      name: 'JOLS',
      qtd: 120,
      price: 84.50,
    },
    {
      name: 'ABSA',
      qtd: 100,
      price: 70.00,
    },
    {
      name: 'JCER',
      qtd: 100.00,
      price: 75,
    },
    {
      name: 'OCMP',
      qtd: 120,
      price: 84.50,
    },
  ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Assets', null, {}),
};