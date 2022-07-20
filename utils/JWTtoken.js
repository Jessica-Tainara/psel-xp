require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '240m',
  algorithm: 'HS256',
};

const generateJWTToken = (payload) => 
  jwt.sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token) => {
  try {
    const introspection = await jwt.verify(token, SECRET, jwtConfig);
    return introspection;
  } catch (e) {
    console.log('error', e.message);
    return undefined;
  } 
};

module.exports = {
  generateJWTToken,
  authenticateToken,
};