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
