const customError = require('../utils/customError');

const errors = [
  [400, '"fullName" is required'],
  [422, '"fullName" must be a string'],
  [422, '"fullName" length must be at least 8 characters long'],
  [400, '"email" is required'],
  [422, '"email" must be a valid email'],
  [400, '"password" is required'],
  [422, '"password" length must be at least 6 characters long']
];

module.exports = (req, _res, next) => {
  const { fullName, email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const index = [
    fullName === undefined,
    typeof fullName !== 'string',
    fullName.length < 8,
    email === undefined,
    ! emailRegex.test(email),
    password === undefined,
    String(password).length < 6
  ].indexOf(true);

  const [status, message] = errors[index];
  if (index) throw customError(status, message);

  return next();
};
