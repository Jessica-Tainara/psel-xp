const { Account, History } = require('../models');
const customError = require('../error/customError')
  
const deposit = async ({ conta: accountId, Valor}) => {

  const { balance } = await Account.findByPk(accountId);

  await Account.update({ balance: Number(balance) + Valor }, { where: { id: accountId } });

  await History.create({ accountId, transaction: 'Depósito', value: Valor });

  return { message: 'Depósito finalizado com sucesso!' }
};

module.exports = { deposit, withdraw, balance, history }; 