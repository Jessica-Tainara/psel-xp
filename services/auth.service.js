const { Client } = require('../models');
const customError = require('../utils/customError');
const { generateJWTToken } = require('../utils/JWTtoken');

authentication = async ({ email, password }) => {
  if (!email || !password) 
    throw customError(400, 'Some required fields are missing');

  const client = await Client.findOne({
    attributes: ['fullName', 'email'],
    where: {
      email,
      password
    }
  });

  if (!client) 
    throw customError(400, 'Invalid  fields');

  const token = generateJWTToken(client);

  return token;
};

module.exports = {
  authentication
};
