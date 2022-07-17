const Account = (sequelize, DataTypes)=> {
  const accountTable = sequelize.define("Account", {
    clientId: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL
  }, {
      timestamps: false,
     })
  accountTable.associate= (models)=>{
    accountTable.belongsTo(models.Client, { as: 'client', foreignKey: 'clientId'});
    accountTable.hasMany(models.History, { as: 'transactions', foreignKey: 'accountId'});
  }
  return accountTable;
}

module.exports = Account;
