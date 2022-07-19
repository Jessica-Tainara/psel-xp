const { Account, History } = require('../models');
const customError = require('../error/customError')
  
const deposit = async ({ conta: accountId, Valor}) => {

  const { balance } = await Account.findByPk(accountId);

  await Account.update({ balance: Number(balance) + Valor }, { where: { id: accountId } });

  await History.create({ accountId, transaction: 'Depósito', value: Valor });

  return { message: 'Depósito finalizado com sucesso!' }
};

const withdraw = async ({ codConta: accountId, Valor}) => {

    const account = await Account.findByPk(accountId);
  
    const balance = Number(account.balance);
  
    if(balance < Valor) throw customError(200, "Saldo insuficiente")
  
    await Account.update({ balance: balance - Valor }, { where: { id: accountId },});
  
    await History.create({ accountId, transaction: 'Saque', value: Valor, details:'' });
  
    return { message: 'Saque finalizado com sucesso!' }
  };
  
module.exports = { deposit, withdraw, balance, history }; 