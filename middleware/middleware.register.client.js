const customError = require('../utils/customError');

module.exports = (req, _res, next) => {
  const { fullName = '', email = '', password = '' } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errors = [
    [400, `"fullName" is required`],
    [422, `"fullName" must be a string`],
    [422, `"fullName" length must be at least 8 characters long`],
    [400, `"email" is required`],
    [422, `"email" must be a valid email`],
    [400, `"password" is required`],
    [422, '"password" length must be at least 6 characters long']];
  
  const index = [fullName === '', typeof fullName !== 'string', fullName.length < 8, 
    email === '', !emailRegex.test(email), password === '', String(password).length < 6]
    .indexOf(true);
  
  const [status, message] = errors[index] || [];
  if(message) throw customError(status,message);

  return next();

};