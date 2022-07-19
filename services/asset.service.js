const Sequelize = require('sequelize');
const { BuyingAsset, Asset, Account, History } = require('../models');
const customError = require('../error/customError');

const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const prevInfos = async(object) => {
    const { codAtivo: assetId, codCliente: clientId, qtdeAtivo } = object;
    const { price, qtd } = await Asset.findByPk(assetId);
    const { balance, id: accountId } = await Account.findOne({ where: { clientId } });
    const total = price * qtdeAtivo;

    const { qtd:purchasedAssets = 0 } = await BuyingAsset
      .findOne({ where: { accountId, assetId } }) || {};

      return { accountId, total, balance: Number(balance), purchasedAssets, prevAssets: qtd }
}

const runTransactions = async(t, infos) => {
  const { codCliente: clientId, codAtivo: assetId, qtdeAtivo, newBalance, 
    total, purchasedAssets, newPurchasedAssets, transaction, accountId} = infos;

  await Account.update({ balance: newBalance }, { where: { clientId: clientId }},
    { transaction: t });
    
  const details = JSON.stringify({ assetId, qtdeAtivo })
    await History.create({ accountId, transaction, value: total, details }, 
      { transaction: t });

  if(purchasedAssets){
    await BuyingAsset.update({ qtd: newPurchasedAssets }, { where: { accountId, assetId } }, 
      { transaction: t });
  } else{
    await BuyingAsset.create({ accountId, assetId, qtd: qtdeAtivo },{ transaction: t });
  }
}

const buy = async (object) => {
    const { total, balance, prevAssets, purchasedAssets,accountId } = await prevInfos(object);
    const { qtdeAtivo, codAtivo: assetId } = object;
    if(prevAssets < qtdeAtivo) throw customError(200, "Quantidade de ativos indisponível");
    if(balance < total) throw customError(200, "Saldo insuficiente");

    const newBalance = balance - total;
    const newPurchasedAssets = purchasedAssets + qtdeAtivo

    const t = await sequelize.transaction();

  try{
    await Asset.update({qtd: prevAssets - qtdeAtivo}, { where: { id: assetId } }, 
    { transaction: t })
    await runTransactions(t, {...object, newBalance, total, purchasedAssets, 
        newPurchasedAssets, prevAssets, transaction: 'Compra de ativos', accountId });
    await t.commit();
    return { message: 'Compra finalizada com sucesso!' };

  } catch(e){
    await t.rollback();
    console.log(e.message);
     throw customError(200, 'Não foi possível finalizar a transação' );
  }
};

module.exports = { buy }; 