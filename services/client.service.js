const Sequelize = require('sequelize');
const { Account, History, Client } = require('../models');
const customError = require('../utils/customError');
const isAuthorized = require('../utils/isAuthorized');
const authService = require('./auth.service');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const deposit = async ({ codCliente: clientId, valor }) => {
  const { balance, id: accountId } = await Account.findOne({ where: { clientId } });

  const t = await sequelize.transaction();

  try {
    await Account.update({ balance: Number(balance) + valor}, { where: { id: accountId } },
      { transaction: t });

    await History.create({
      accountId,
      transaction: 'Depósito',
      value: valor,
      details: ''
    }, { transaction: t });

    await t.commit();

    return { codCliente: clientId, valor, saldo: Number(balance) + valor };

  } catch (e) {
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar a transação');
  }
};

const withdraw = async ({ codCliente: clientId, valor }, { email }) => {
  await isAuthorized(email, clientId);
  const { balance, id: accountId } = await Account.findOne({ where: { clientId } });

  if (balance < valor) 
    throw customError(200, "Saldo insuficiente");
  
  const t = await sequelize.transaction();

  try {
    await Account.update({ balance: Number(balance) - valor }, { where: { id: accountId } },
      {transaction: t});

    await History.create({
      accountId,
      transaction: 'Saque',
      value: valor,
      details: ''
    }, {transaction: t});

    await t.commit();

    return { codCliente: clientId, valor, saldo: Number(balance) - valor };

  } catch (e) {
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar a transação');
  }
};

const balance = async (clientId, { email }) => {
  await isAuthorized(email, clientId);
  const { balance: saldo } = await Account.findOne({ where: { clientId } });
  return { codCliente: clientId, saldo };
};

const history = async (clientId, { email }) => {
  await isAuthorized(email, clientId);
  const { id: accountId } = await Account.findOne({ where: { clientId } });

  const history = await History.findAll({ where: { accountId },
    attributes: [
      ['id', 'codTransacao'],
      ['transaction', 'tipoTransacao'],
      ['value', 'valor'],
      ['details', 'detalhes']
    ]
  });

  history.forEach((item) => {
    if (item.detalhes) {
      const { assetId: codAtivo, qtdeAtivo } = JSON.parse(item.detalhes);
      item.detalhes = {
        codAtivo,
        qtdeAtivo
      };
    }
  });

  return history;
};

const register = async ({ fullName, email, password }) => {

  const t = await sequelize.transaction();

  try {
    const { id: codCliente } = await Client.create({
      fullName,
      email,
      password: String(password)
    }, { transaction: t });
    const { balance: saldo } = await Account.create({
      codCliente,
      balance: 0.00
    }, { transaction: t });

    await t.commit();
    const { token } = await authService.authentication({ email, password });
    return { codCliente, token };
  } catch (e) {
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar o cadastro');
  };
}
module.exports = {
  deposit,
  withdraw,
  balance,
  history,
  register
};
