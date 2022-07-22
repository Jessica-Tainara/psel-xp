const customError = require('../utils/customError');

function isDecimal(x) {
  if(typeof x === 'number') {
    const num = String(x).split('');
      if(num.includes('.')) {
        const index = num.indexOf('.');
        if(index + 3 === num.length || index + 2 === num.length) {
          return true;
        }
      }else {
        return true;
  }
} ;  
  
  return false;
}


module.exports = (req, _res, next) => {
  const { codCliente = '', valor = '' } = req.body;
  const errors = [
    [400, '"codCliente" is required'],
    [422, '"codCliente" must be a number'],
    [422, '"codCliente" must be a greather than or equal 1'],
    [400, '"valor" is required'],
    [422, '"valor" must be a number'],
    [422, '"valor" must be a decimal than or equal 0']
  ];

  const index = [
    codCliente === '',
    typeof codCliente !== 'number',
    (!Number.isSafeInteger(codCliente) || codCliente < 1),
    valor === '',
    typeof valor !== 'number',
    (!isDecimal(Number(valor)) || Number(valor) <= 0)
  ].indexOf(true);

  const [status, message] = errors[index] || [];

  if (index >= 0) throw customError(status, message);
  
  return next();

};
