const History = (sequelize, DataTypes)=> {
  const historyTable = sequelize.define("History", {
    accountId: DataTypes.INTEGER,
    transaction: DataTypes.STRING,
    value: DataTypes.DECIMAL(10,2),
    details: DataTypes.STRING
  }, {
      timestamps: false,
     })
  historyTable.associate= (models)=>{
    historyTable.belongsTo(models.Account, { as: 'account', foreignKey: 'accountId'})
  }
  return historyTable;
}

module.exports = History;