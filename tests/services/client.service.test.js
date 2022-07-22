const sinon = require('sinon');
const {expect} = require('chai');

const {
  deposit,
  withdraw,
  history,
  balance,
  register
} = require('../../services/client.service');
const { Client, Account, History } = require('../../models');

const historico = [
  {
    codTransacao: 1,
    tipoTransacao: "depósito",
    valor: 250.00,
    detalhes: ''
  },
  {
    codTransacao: 2,
    tipoTransacao: "saque",
    valor: 250.00,
    detalhes: ''
  }
]
describe('6 - Ao realizar um deposito:', async () => {
  before(async () => {
    sinon.stub(Account, "findOne").resolves({ id: 1 });
    sinon.stub(Account, "update").resolves();
    sinon.stub(History, "create").resolves()
  })

  after(async () => {
    Account.findOne.restore();
    Account.update.restore();
    History.create.restore();

  })

  it('Retorna uma mensagem de sucesso quando concluido', async () => {
    const response = await deposit({codCliente: 1, valor: 500.00});

    expect(response.message).to.equal('Depósito finalizado com sucesso!');

  });

  it('Retorna uma mensagem de erro quando ocorrer alguma falha durante a transação', async () => {
    History.create.restore();
    sinon.stub(History, "create").throws(new Error(''))
    let err;
    try {
      const response = await deposit({codCliente: 1, valor: 500.00});
    } catch (e) {
      err = e
    }
    expect(err.message).to.equal('Não foi possível finalizar a transação');


  })
});

describe('7 - Ao realizar um saque:', async () => {
  before(async () => {

    sinon.stub(Account, "findOne").resolves({id: 1, balance: 600.00});
    sinon.stub(Client, "findOne").resolves({id: 1});
    sinon.stub(Account, "update").resolves();
    sinon.stub(History, "create").resolves()
  })

  after(async () => {
    Account.findOne.restore();
    Client.findOne.restore();
    Account.update.restore();
    History.create.restore();

  })

  it('Retorna uma mensagem de sucesso quando concluido', async () => {
    const response = await withdraw({
      codCliente: 1,
      valor: 500.00
    }, {email: "teste@test.com"});

    expect(response.message).to.equal('Saque finalizado com sucesso!');

  });
  it('Retorna um erro com a mensagem "Não autorizado!" quando o usuario não for autorizado', async () => {
    let err;
    try {

      const response = await withdraw({
        codCliente: 2,
        valor: 500.00
      }, {email: "teste@test.com"});
    } catch (e) {
      err = e
    }
    expect(err.message).to.equal('Não autorizado!');


  })
  it('Retorna erro com amensagem "Saldo insuficiente" quando o saldo disponível na carteira não é suficiente', async () => {
    let err;
    try {

      const response = await withdraw({
        codCliente: 1,
        valor: 700.00
      }, {email: "teste@test.com"});
    } catch (e) {
      err = e
    }
    expect(err.message).to.equal('Saldo insuficiente');


  })

  it('Retorna uma mensagem de erro quando ocorrer alguma falha durante a transação', async () => {
    History.create.restore();
    sinon.stub(History, "create").throws(new Error(''))
    let err;
    try {

      const response = await withdraw({
        codCliente: 1,
        valor: 500.00
      }, {email: "teste@test.com"});
    } catch (e) {
      err = e
    }
    expect(err.message).to.equal('Não foi possível finalizar a transação');


  })

})
describe('8 - Ao buscar historico de um cliente:', async () => {
  before(async () => {

    sinon.stub(Account, "findOne").resolves({id: 1, balance: 600.00});
    sinon.stub(Client, "findOne").resolves({id: 1});
    sinon.stub(History, "findAll").resolves(historico);
  });

  after(async () => {
    Account.findOne.restore();
    Client.findOne.restore();
    History.findAll.restore();

  })

  it('Retorna um array de objetos com com codigo, tipo, valor e detalhes da transação', async () => {
    const response = await history(1, {email: "teste@test.com"});

    expect(response).to.deep.equal(historico);
    expect(response[0].tipoTransacao).to.equal('depósito');
    expect(response[0].valor).to.equal(250.00);
    expect(response[0].detalhes).to.equal('');

  });
  it('Retorna uma mensagem de erro quando o usuario não for autorizado', async () => {
    let err;
    try {

      const response = await history(2, {email: "teste@test.com"});
    } catch (e) {
      err = e
    }
    expect(err.message).to.equal('Não autorizado!');


  })

})
