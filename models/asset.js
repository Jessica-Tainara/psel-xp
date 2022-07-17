const Asset = (sequelize, DataTypes)=> {
  const assetTable = sequelize.define("Asset", {
    name: DataTypes.STRING,
    qtd: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
      timestamps: false,
     })

  return assetTable;
}

module.exports = Asset;