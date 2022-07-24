const { Client } = require('../models');
const customError = require('../utils/customError');
const { generateJWTToken } = require('../utils/JWTtoken');

authentication = async ({ email, password }) => {
  if (!email || !password) 
    throw customError(400, 'Some required fields are missing');

  const client = await Client.findOne({
    attributes: ['fullName', 'email', 'id'],
    where: {
      email,
      password
    }
  });

  if (!client) 
    throw customError(400, 'Dados inválidos');

  const token = generateJWTToken({
    email: client.email,
    fullName: client.fullName
  });

  return { codCliente: client.id, token };
};

module.exports = {
  authentication
};
