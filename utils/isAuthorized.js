const { Client } = require('../models');
const customError = require('../utils/customError');

module.exports = async (email, clientId) => {
  const { id } = await Client.findOne({ where: { email } });

  if (Number(clientId) !== id) 
  throw customError(401, 'Não autorizado!');  
};
