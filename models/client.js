const Client = (sequelize, DataTypes)=> {
  const clientTable = sequelize.define("Client", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      timestamps: false,
     })
  clientTable.associate= (models)=>{
    clientTable.hasOne(models.Account, { as: 'account', foreignKey: 'clientId'})
  }
  return clientTable;
}

module.exports = Client;
