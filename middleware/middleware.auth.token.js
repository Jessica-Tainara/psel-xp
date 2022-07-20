const { authenticateToken } = require('../utils/JWTtoken');
const customError = require('../utils/customError');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  const errors = ['Token not found', 'Expired or invalid token'];

  const payload = await authenticateToken(token);

  const message = errors[[!token, !payload].indexOf(true)];
  
  if(message) throw customError(401, message);

  res.locals.payload = payload;

  return next();
};
