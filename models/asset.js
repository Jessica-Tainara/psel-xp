const Asset = (sequelize, DataTypes)=> {
  const assetTable = sequelize.define("Asset", {
    name: DataTypes.STRING,
    qtd: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10,2)
  }, {
      timestamps: false,
     })

  return assetTable;
}

module.exports = Asset;