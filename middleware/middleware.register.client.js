const customError = require('../utils/customError');
const errorsLogin = [
  [400, '"email" is required'],
  [422, '"email" must be a valid email'],
  [400, '"password" is required'],
  [422, '"password" length must be at least 6 characters long']
]
const errors = [
  [400, '"fullName" is required'],
  [422, '"fullName" must be a string'],
  [422, '"fullName" length must be at least 8 characters long'],
  ...errorsLogin
];

const validateLogin = (req, res, next) => {
  const { email = '', password = '' } = req.body;
  console.log(email)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const index = [
    email === '',
    ! emailRegex.test(email),
    password === '',
    String(password).length < 6
  ].indexOf(true);

  const [status, message] = errorsLogin[index];

  if (status) throw customError(status, message);

  return next();
};

const validateRegister = (req, _res, next) => {
  const { fullName = '', email = '', password ='' } = req.body;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const index = [
    fullName === '',
    typeof fullName !== 'string',
    fullName.length < 8,
    email === '',
    ! emailRegex.test(email),
    password === '',
    String(password).length < 6
  ].indexOf(true);

  const [status, message] = errors[index] || [];
  console.log(status)
  if (status) throw customError(status, message);

  return next();
};

module.exports = { validateLogin, validateRegister };
