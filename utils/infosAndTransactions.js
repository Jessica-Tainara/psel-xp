const { BuyingAsset, Asset, Account, History } = require('../models');

const prevInfos = async(object, buy) => {
  const { codAtivo: assetId, codCliente: clientId, qtdeAtivo } = object;
  const { price, qtd: availableAssets } = await Asset.findByPk(assetId);
  const { balance, id: accountId } = await Account.findOne({ where: { clientId } });
  const total = price * qtdeAtivo;
  const newBalance = buy ? Number(balance) - total : Number(balance) + total;
  const newAvailableAssets = availableAssets - qtdeAtivo;
  const { qtd:purchasedAssets = 0 } = await BuyingAsset
    .findOne({ where: { accountId, assetId } }) || {};
  const newPurchasedAssets = buy ? purchasedAssets + qtdeAtivo : purchasedAssets - qtdeAtivo;

    return { accountId, total, newAvailableAssets, newPurchasedAssets,
      purchasedAssets, availableAssets, newBalance };
}

const runTransactions = async(t, infos) => {
  const { codCliente: clientId, codAtivo: assetId, qtdeAtivo, newBalance, 
    total, purchasedAssets, newPurchasedAssets, transaction, accountId} = infos;

  await Account.update({ balance: newBalance }, { where: { clientId: clientId }},
    { transaction: t });
  
  const details = JSON.stringify({ assetId, qtdeAtivo });
  await History.create({ accountId, transaction, value: total, details }, 
    { transaction: t });

  if(purchasedAssets){
    await BuyingAsset.update({ qtd: newPurchasedAssets }, 
      { where: { accountId, assetId } }, { transaction: t });
  } else{
    await BuyingAsset.create({ accountId, assetId, qtd: qtdeAtivo },{ transaction: t });
  }
}
module.exports = { prevInfos , runTransactions }