const BuyingAsset = (sequelize, DataTypes)=> {
  const buyingAssetTable = sequelize.define("BuyingAsset", {
    accountId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER
  }, {
      timestamps: false,
     })
     buyingAssetTable.associate = (models) => {
      models.Account.belongsToMany(models.Asset, {
        as: 'assets',
        through: buyingAssetTable,
        foreignKey: 'accountId',
        otherKey: 'assetId',
      });
      models.Asset.belongsToMany(models.Account, {
        as: 'accounts',
        through: buyingAssetTable,
        foreignKey: 'assetId',
        otherKey: 'accountId',
      });
    };
  return buyingAssetTable;
}

module.exports = BuyingAsset;