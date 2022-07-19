module.exports = (req, res, next) => {
  const { codCliente = '', codAtivo = '', qtdeAtivo = '' } = req.body;

  const createErrors = (key) => [
    [400, `"${key}" is required`],
    [422, `"${key}" must be a number`],
    [422, `"${key}" must be greater than or equal to 1`]];
    
  const createChecks = (key) => 
    [!key, typeof key !== 'number', (!Number.isSafeInteger(key) || key < 1)];

  const keys = ['codCliente', 'codAtivo', 'qtdeAtivo']
    
  const index = [createChecks(codCliente),
    createChecks(codAtivo),createChecks(qtdeAtivo)].map((check, i)=>{
      return check.includes(true) ? [i, check.indexOf(true)] : undefined})
      .find((erro)=>erro);

  const error = index && res.status(createErrors(keys[index[0]])[index[1]][0])
    .json({ message: createErrors(keys[index[0]])[index[1]][1]});
  
    return error || next();
  };
