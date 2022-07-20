const Sequelize = require('sequelize');
const { Account, History, Client } = require('../models');
const customError = require('../error/customError');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);
  
const deposit = async ({ codCliente: clientId, valor}) => {
  const { balance, id: accountId } = await Account.findOne({ where: { clientId } });

  const t = await sequelize.transaction();

  try{
    await Account.update({ balance: Number(balance) + valor }, 
      { where: { id: accountId } }, { transaction: t });

    await History.create({ accountId, transaction: 'Depósito', value: valor },
      { transaction: t });

    await t.commit();

    return { message: 'Depósito finalizado com sucesso!' };
  
  } catch(e){
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar a transação' );
  }
};

const withdraw = async ({ codCliente: clientId, valor}) => {
  const { balance, id: accountId } = await Account.findOne({ where: { clientId } });
  
  if(balance < valor) throw customError(200, "Saldo insuficiente");

  const t = await sequelize.transaction();

  try{
    await Account.update({ balance: Number(balance) - valor }, { where: { id: accountId } },
      { transaction: t });
  
    await History.create({ accountId, transaction: 'Saque', value: valor, details:'' },
      { transaction: t });

    await t.commit();

    return { message: 'Saque finalizado com sucesso!' };

  } catch(e){
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar a transação' );
  }
};
  
const balance = async (clientId) => {
  const { balance:saldo, id: conta } = await Account.findOne({ where: { clientId } });
    return { codCliente: clientId, conta, saldo };
};
  
const history = async (clientId) => {
  const { id: accountId } = await Account.findOne({ where: { clientId } });

  const history = await History.findAll({ where: { accountId }, attributes: [
    ['id', 'codTransacao'],['accountId', 'conta'], ['transaction', 'tipoTransacao'], 
    ['value', 'valor'], ['details', 'detalhes'] ] });
  
  history.forEach(({ dataValues })=> {
    if(dataValues.detalhes) {
      const {assetId: codAtivo, qtdeAtivo} = JSON.parse(dataValues.detalhes);
      dataValues.detalhes = { codAtivo, qtdeAtivo };
    }
  });

  return history;
};

const register = async({ fullName, email, password }) => {

  const t = await sequelize.transaction();

  try{
    const { id: clientId } = await Client.create({ fullName, email, password }, 
      { transaction: t });
    const { clientId: codCliente, balance: saldo } = await Account
      .create({ clientId, balance: 0.00} , { transaction: t });

    await t.commit();
    return { codCliente, saldo };
  } catch(e){
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar o cadastro');
  };
}
module.exports = { deposit, withdraw, balance, history, register }; 