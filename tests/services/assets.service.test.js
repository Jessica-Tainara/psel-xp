const sinon = require('sinon');
const {expect} = require('chai');

const {
  getAll,
  getByClient,
  getById,
  buy,
  sell
} = require('../../services/asset.service');
const {Asset, Account, BuyingAsset, History} = require('../../models');
const {Client} = require('../../models');
const isAuthorized = require('../../utils/isAuthorized')

const assets = [
  {
    "codAtivo": 1,
    "ativo": "JTSA",
    "qtdeAtivo": 100,
    "valor": 200.00
  }, {
    "codAtivo": 2,
    "ativo": "PVSA",
    "qtdeAtivo": 250,
    "valor": 250.00
  }
];

const purchases = [
  {
      "accountId": 1,
      "assetId": 1,
      "qtd": 15

  }, {

      "accountId": 1,
      "assetId": 2,
      "qtd": 5
  },
]
describe('1 - Ao realizar uma compra de ativos:', async () => {
  before(async () => {
    sinon.stub(Client, "findOne").resolves({ id: 1 })
    sinon.stub(Account, "findOne").resolves({ balance: 3000.00, id: 1 });
    sinon.stub(Account, "update").resolves();
    sinon.stub(History, "create").resolves()
    sinon.stub(BuyingAsset, "findOne").resolves({ qtd: 0 });
    sinon.stub(BuyingAsset, "create").resolves();
    sinon.stub(BuyingAsset, "update").resolves();
    sinon.stub(Asset, "update").resolves();
    const findByPk = sinon.stub(Asset, 'findByPk');
    findByPk.withArgs(1).returns({ price: 70.00, qtd: 100 });
  })

  after(async () => {
    Client.findOne.restore();
    Account.findOne.restore();
    Account.update.restore();
    Asset.findByPk.restore();
    Asset.update.restore();
    BuyingAsset.findOne.restore();
    BuyingAsset.create.restore();
    BuyingAsset.update.restore();
    History.create.restore();
  })

  it('Retorna uma mensagem de sucesso quando concluida', async () => {
    const response = await buy({
      codCliente: 1,
      codAtivo: 1,
      qtdeAtivo: 5
    }, { email: 'teste@test.com' });

    expect(response.message).to.equal('Compra finalizada com sucesso!');

  });

  it('Retorna um erro com mensagem "Não autorizado!" e status 401, quando o usuário logado náo é autorizado', async () => {
    let err;
    try {
      const response = await buy({
        codCliente: 2,
        codAtivo: 1,
        qtdeAtivo: 105
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.status).to.equal(401);
    expect(err.message).to.equal('Não autorizado!');
  })

  it('Retorna um erro com a quantidade de ativos disponível na corretora ao tentar comprar quantidade maior que a disponivel', async () => {
    let err;
    try {
      const response = await buy({
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 105
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.message).to.equal('Quantidade de ativos disponível: 100');
  })
  it('Retorna erro com mensagem "Saldo insuficiente" se o valor total da compra for maior que o saldo disponivel na carteira', async () => {
    let err;
    try {
      const response = await buy({
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 100
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.message).to.equal('Saldo insuficiente');
  })
  it('Retorna mensagem de erro caso ocorra alguma falha na transação', async () => {
    History.create.restore();
    sinon.stub(History, "create").throws(new Error(''));
    let err;
    try {
      const response = await buy({
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 1
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.message).to.equal('Não foi possível finalizar a transação');
  })
});

describe('2 - Ao realizar uma venda de ativos:', async () => {
  before(async () => {
    sinon.stub(Account, "findOne").resolves({ balance: 3000.00, id: 1 });
    sinon.stub(Client, "findOne").resolves({ id: 1 })
    sinon.stub(BuyingAsset, "findOne").resolves({ qtd: 5 });
    sinon.stub(Account, "update").resolves();
    sinon.stub(History, "create").resolves()
    sinon.stub(BuyingAsset, "update").resolves();
    const findByPk = sinon.stub(Asset, 'findByPk');
    findByPk.withArgs(1).returns({ price: 70.00, qtd: 100 });
  })

  after(async () => {
    Account.findOne.restore();
    Client.findOne.restore();
    BuyingAsset.findOne.restore();
    BuyingAsset.update.restore();
    Account.update.restore();
    History.create.restore();
    Asset.findByPk.restore();
  })

  it('Retorna umma mensagem de sucesso ao ser concluída', async () => {
    const response = await sell({
      codCliente: 1,
      codAtivo: 1,
      qtdeAtivo: 5
    }, { email: 'teste@test.com' });

    expect(response.message).to.equal('Venda finalizada com sucesso!');

  })
  it('Retorna um erro com a mensagem "Não autorizado!" e status 401 quando o usuário não for autorizado', async () => {
    let err;
    try {
      const response = await sell({
        codCliente: 2,
        codAtivo: 1,
        qtdeAtivo: 105
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.message).to.equal('Não autorizado!');
  })

  it('Retorna um erro com a quantidade de ativos disponivel na carteira ao tentar vender quantidade maior que a disponível ', async () => {
    let err;
    try {
      const response = await sell({
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 105
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.message).to.equal('Quantidade disponível desse ativo para venda: 5');
  })
  it('Retorna mensagem de erro caso ocorra alguma falha na transação', async () => {
    History.create.restore();
    sinon.stub(History, "create").throws(new Error(''));
    let err;
    try {
      const response = await sell({
        codCliente: 1,
        codAtivo: 1,
        qtdeAtivo: 1
      }, {email: 'teste@test.com'});
    } catch (e) {
      err = e
    }
    expect(err).to.exist;
    expect(err.message).to.equal('Não foi possível finalizar a transação');
  })
});

