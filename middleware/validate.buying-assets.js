const customError = require("../utils/customError");

const createErrors = (key) => [
  [400, `"${key}" is required`],
  [422, `"${key}" must be a number`],
  [422, `"${key}" must be a greather than or equal 1`]
];

const createChecks = (key) => [
  key === '',
  typeof key !== 'number',
  (!Number.isSafeInteger(key) || key < 1)
];

module.exports = (req, _res, next) => {
  const { codCliente = '', codAtivo = '', qtdeAtivo = '' } = req.body;

  const keys = ['codCliente', 'codAtivo', 'qtdeAtivo']

  const indexArray = [
    createChecks(codCliente), 
    createChecks(codAtivo), 
    createChecks(qtdeAtivo)]
    .map((check, i) => {
    return check.includes(true) ? [i, check.indexOf(true)] : undefined })
    .find((erro) => erro);

  if (indexArray) {
    const [indexKey, indexError] = indexArray;
    const [status, message] = createErrors(keys[indexKey])[indexError];
    throw customError(status, message);
  }
  return next();
};
