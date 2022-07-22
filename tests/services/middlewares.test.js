const sinon = require('sinon');
const {expect} = require('chai');

const {
  validateLogin, 
  validateRegister
} = require('../../middleware/middleware.register.client');

const buyingAssets = require('../../middleware/validate.buying-assets');
const depositSaque = require('../../middleware/validate.deposit-saque');

describe('12 - (middleware) Ao registrar um cliente:', async () => {

  it('Valida que "fullName" existe e é uma string com 8 caracteres ou mais', async () => {
    let err;
    const errosMessage = [
      '"fullName" is required', 
      '"fullName" must be a string', 
      '"fullName" length must be at least 8 characters long'
    ];

    [undefined, 1, "Jess"].forEach((a, i) => {
      try {
        const response = validateRegister({
          body: {
            fullName: a,
            email: "jessica@test.com",
            password: "password"
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });

  it('Valida que "email" existe e está em formato válido', async () => {
    let err;
    const errosMessage = [
      '"email" is required', 
      '"email" must be a valid email', 
    ];

    [undefined,"Jess"].forEach((a, i) => {
      try {
        const response = validateRegister({
          body: {
            fullName: "Jessica Tainara",
            email: a,
            password: "password"
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
  it('Valida que "password" existe e tem 6 caracteres ou mais', async () => {
    let err;
    const errosMessage = [
      '"password" is required', 
      '"password" length must be at least 6 characters long'
    ];

    [undefined, "Jess"].forEach((a, i) => {
      try {
        const response = validateRegister({
          body: {
            fullName: "Jessica Tainara",
            email: "jessica@test.com",
            password: a
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
});

describe('13 - (middleware) Ao fazer login:', async () => {

  it('Valida que "email" existe e está em formato válido', async () => {
    let err;
    const errosMessage = [
      '"email" is required', 
      '"email" must be a valid email', 
    ];

    [undefined,"Jess"].forEach((a, i) => {
      try {
        const response = validateLogin({
          body: {
            email: a,
            password: "password"
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
  it('Valida que "password" existe e tem 6 caracteres ou mais', async () => {
    let err;
    const errosMessage = [
      '"password" is required', 
      '"password" length must be at least 6 characters long'
    ];

    [undefined, "Jess"].forEach((a, i) => {
      try {
        const response = validateLogin({
          body: {
            email: "jessica@test.com",
            password: a
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
});
describe('14 - (middleware) Ao realizar compra ou venda de um ativo:', async () => {

  it('Valida que "codCliente" existe e é um inteiro maior ou igual a 1', async () => {
    let err;
    const errosMessage = [
      '"codCliente" is required', 
      '"codCliente" must be a number', 
      '"codCliente" must be a greather than or equal 1'
    ];

    [undefined, "1", 1.5].forEach((a, i) => {
      try {
        const response = buyingAssets({
          body: {
            codCliente: a,
            codAtivo: 1,
            qtdeAtivo: 1
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });

  it('Valida que "codAtivo" existe e é um inteiro maior ou igual a 1', async () => {
    let err;
    const errosMessage = [
      '"codAtivo" is required', 
      '"codAtivo" must be a number', 
      '"codAtivo" must be a greather than or equal 1'
    ];

    [undefined, "1", 1.5].forEach((a, i) => {
      try {
        const response = buyingAssets({
          body: {
            codCliente: 1,
            codAtivo: a,
            qtdeAtivo: 1
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
  it('Valida que "qtdeAtivo" existe e é um inteiro maior ou igual a 1', async () => {
    let err;
    const errosMessage = [
      '"qtdeAtivo" is required', 
      '"qtdeAtivo" must be a number', 
      '"qtdeAtivo" must be a greather than or equal 1'
    ];

    [undefined, "1", 1.5].forEach((a, i) => {
      try {
        const response = buyingAssets({
          body: {
            codCliente: 1,
            codAtivo: 1,
            qtdeAtivo: a
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
});

describe('15 - (middleware) Ao realizar um depósito ou saque:', async () => {

  it('Valida que "codCliente" existe e é um inteiro maior ou igual a 1', async () => {
    let err;
    const errosMessage = [
      '"codCliente" is required', 
      '"codCliente" must be a number', 
      '"codCliente" must be a greather than or equal 1'
    ];

    [undefined, "1", 1.5].forEach((a, i) => {
      try {
        const response = depositSaque({
          body: {
            codCliente: a,
            valor: 100.00
          }
        }, {}, () => { return true });

      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });

  it('Valida que "valor" existe , é maior que zero, e tem até duas casas decimais', async () => {
    let err;
    const errosMessage = [
      '"valor" is required', 
      '"valor" must be a number', 
      '"valor" must be a decimal than or equal 0',
      '"valor" must be a decimal than or equal 0',
    ];

    [undefined,'1',0.5525, -4.52].forEach((a, i) => {
      try {
        const response = depositSaque({
          body: {
            codCliente: 1,
            valor: a
          }
        }, {}, () => { return true });
      }catch (e) {
        err = e
      }
      expect(err.message).to.equal(errosMessage[i]);
    })
  });
});

