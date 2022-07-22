const customError = require('../utils/customError');

module.exports = (req, _res, next) => {
  const { codCliente, valor } = req.body;
  const errors = [
    [400, '"codCliente" is required'],
    [422, '"codCliente" must be a number'],
    [422, '"codCliente" must be a greather than or equal 1'],
    [400, '"valor" is required'],
    [422, '"valor" must be a number'],
    [422, '"valor" must be a greather than or equal 1']
  ];

  const index = [
    codCliente === undefined,
    typeof codCliente !== 'number',
    (!Number.isSafeInteger(codCliente) || codCliente < 1),
    valor === undefined,
    typeof valor !== 'number',
    (!Number.isSafeInteger(valor) || valor < 1)
  ].indexOf(true);

  const [status, message] = errors[index] || [];

  if (message) throw customError(status, message);
  
  return next();

};
