const { authenticateToken } = require('../utils/JWTtoken');
const customError = require('../utils/customError');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const tokenBearer = token && token.split(' ')[1]

  const errors = ['Token not found', 'Expired or invalid token'];

  const payload = await authenticateToken(tokenBearer || token);

  const message = errors[[
    ! token,
    ! payload
  ].indexOf(true)];

  if (message) throw customError(401, message);

  res.locals.payload = payload;

  return next();
};
