const customError = require('../utils/customError');

module.exports = (req, _res, next) => {
  const { codCliente = '', valor = '' } = req.body;
  const errors = [
    [400, '"codCliente" é necessário'],
    [422, '"codCliente" deve ser um número'],
    [422, '"codCliente" deve ser um inteiro maior ou igual a 1'],
    [400, '"valor" é necessário'],
    [422, '"valor" deve ser um número'],
    [422, '"valor" deve ser um inteiro maior ou igual a 1']];
  
  const index = [codCliente === '', typeof codCliente !== 'number', 
    (!Number.isSafeInteger(codCliente) || codCliente < 1), 
    valor === '', typeof valor !== 'number', 
    (!Number.isSafeInteger(valor) || valor < 1)].indexOf(true);
  
  const [status, message] = errors[index] || [];
  if(message) throw customError(status,message);

  return next();

};