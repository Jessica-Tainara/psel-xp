const Sequelize = require('sequelize');
const { BuyingAsset, Asset, Account, Client } = require('../models');
const customError = require('../utils/customError');
const { prevInfos, runTransactions } = require('../utils/infosAndTransactions');
const isAuthorized = require('../utils/isAuthorized')

const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const buy = async ({ codCliente, codAtivo, qtdeAtivo }, { email }) => {
  await isAuthorized(email, codCliente);
  const infos = await prevInfos({ codCliente, codAtivo, qtdeAtivo }, true);

  if(infos.newAvailableAssets < 0) throw customError(200, 
    `Quantidade de ativos disponível: ${infos.availableAssets}`);
  if(infos.newBalance < 0) throw customError(200, "Saldo insuficiente");

  const t = await sequelize.transaction();

  try{
    await Asset.update({ qtd: infos.newAvailableAssets }, { where: { id: codAtivo } }, 
      { transaction: t })
    await runTransactions(t, {...infos ,codCliente, codAtivo, qtdeAtivo, transaction: 'Compra de ativos' });
    await t.commit();
    return { message: 'Compra finalizada com sucesso!' };
  } catch(e){
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar a transação' );
  }
};

const sell = async (object, { email }) => {
  await isAuthorized(email, object.codCliente);
  const infos = await prevInfos(object, false);

  if(infos.newPurchasedAssets < 0) throw customError(200, `Quantidade disponível desse ativo para venda: ${infos.purchasedAssets}`);
  const t = await sequelize.transaction();

  try{
    await runTransactions(t, {...object, ...infos, transaction : 'Venda de ativos' });
    await t.commit();
    return { message: 'Venda finalizada com sucesso!' };

  } catch(e){
    await t.rollback();
    console.log(e.message);
    throw customError(200, 'Não foi possível finalizar a transação');
  }
};

const getAll = async () => {
  const assets = await Asset.findAll({
    attributes: [['id', 'codAtivo'],['name', 'ativo'], 
      ['qtd', 'qtdeAtivo'], ['price', 'valor'] ]});
 
  return assets;
};

const getById = async (assetId) => {
  const asset = await Asset.findByPk(assetId, {
    attributes: [['id', 'codAtivo'],['name', 'ativo'], 
      ['qtd', 'qtdeAtivo'], ['price', 'valor'] ]
  });
 
  if(!asset)  throw customError(404, "Ativo não encontrado!");
  return asset;
};

const getByClient = async (clientId, { email }) => {
  await isAuthorized(email, clientId);
  const { id: accountId = 0 } = await Account.findOne({ where: { clientId } }) || {};
  const purchasedAssets = await BuyingAsset.findAll({ where: { accountId } });

  if(!purchasedAssets.length) throw customError(404, "Esse cliente não possui ativos");

  const result = await Promise.all(purchasedAssets.map(async({ dataValues })=> {
  
    const assets =  await Asset.findByPk(dataValues.assetId,{
      attributes: [['id', 'codAtivo'],['name', 'nomeAtivo'], ['price', 'valor'] ]});
  
    return {...assets.dataValues, qtdeAtivo: dataValues.qtd };
  }));

  return result;
};

module.exports = { buy, sell, getById, getByClient, getAll }; 