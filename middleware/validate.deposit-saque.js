const customError = require('../error/customError');

module.exports = (req, _res, next) => {
  const { codCliente = '', valor = '' } = req.body;
  const errors = [
    [400, `"codCliente" is required`],
    [422, `"codCliente" must be a number`],
    [422, `"codCliente" must be greater than or equal to 1`],
    [400, `"valor" is required`],
    [422, `"valor" must be a number`],
    [422, `"valor" must be greater than or equal to 1`]];
  
  const index = [codCliente === '', typeof codCliente !== 'number', 
    (!Number.isSafeInteger(codCliente) || codCliente < 1), 
    valor === '', typeof valor !== 'number', 
    (!Number.isSafeInteger(valor) || valor < 1)].indexOf(true);
  
  const [status, message] = errors[index] || [];
  if(message) throw customError(status,message);

  return next();

};