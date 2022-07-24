const express = require('express');
const serviceAsset = require('../services/asset.service')
const validateAsset = require('../middleware/validate.buying-assets')
const authMiddleware = require('../middleware/middleware.auth.token');

const assetRouter = express.Router();

assetRouter.post('/comprar', authMiddleware, validateAsset, async (req, res) => {
  const response = await serviceAsset.buy(req.body, res.locals.payload);
  return res.status(201).json(response);
});

assetRouter.post('/vender', authMiddleware, validateAsset,  async (req, res) => {
  const response = await serviceAsset.sell(req.body, res.locals.payload);
  return res.status(201).json(response);
});

assetRouter.get('/', async (req, res) => {
  const response = await serviceAsset.getAll();
  return res.status(200).json(response);
});

assetRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await serviceAsset.getById(id);
  return res.status(200).json(response);
});

assetRouter.get('/conta/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await serviceAsset.getByClient(id, res.locals.payload);
  return res.status(200).json(response);
});

/**
 * @swagger
 *  tags:
 *       name: Ativos
 *       description: Endpoint de ativos
 */


/**
 * @swagger
 *  /ativos:
 *          get:
 *            tags: [Ativos]
 *            description: Endpoint retorna uma lista de ativos
 *            responses:
 *              200:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                        properties:
 *                         codAtivo:
 *                            type: number
 *                         nomeAtivo:
 *                           type: string
 *                         valor:
 *                           type: number
 *                         qtdeAtivo:
 *                           type: number
 *                        example:
 *                          codAtivo: 1
 *                          nameAtivo: JTSA
 *                          valor: 100.50
 *                          qtdeAtivo: 150
 */

/**
 * @swagger
 *  /ativos/{codAtivo}:
 *    get:
 *        tags: [Ativos]
 *        description: Endpoint retorna um ativo por código
 *        parameters:
 *          - name: codAtivo
 *            in: path
 *            type: string
 *            required: true
 *        responses:
 *          200:
 *           description: Se o ativo for encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   codAtivo:
 *                     type: number
 *                   nomeAtivo:
 *                     type: string
 *                   valor:
 *                     type: number
 *                   qtdeAtivo:
 *                      type: number
 *                 example:
 *                   codAtivo: 1
 *                   nameAtivo: JTSA
 *                   valor: 100.50
 *                   qtdeAtivo: 150
 *          404:
 *           description: Se o ativo não for encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                 example:
 *                   message: Ativo não encontrado!
 */
/**
 * @swagger
 *  /ativos/comprar:
 *          post:
 *            tags: [Ativos]
 *            description: Endpoint para compra de ativos. * Atente-se em usar o token e o código do cliente dado no endpoint de login ou de registro
 *            security:
 *              - bearerAuth: []
 *            requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      codCliente:
 *                        type: number
 *                      codAtivo:
 *                        type: number
 *                      qtdeAtivo:
 *                        type: number
 *                    example:
 *                      codCliente: 1
 *                      codAtivo: 5
 *                      qtdeAtivo: 8
 *            responses:
 *              201:
 *                description: Se a compra for realizada
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                        codCliente:
 *                          type: number
 *                        codAtivo:
 *                          type: number
 *                        qtdeAtivo:
 *                          type: number
 *                      example:
 *                        message: Compra finalizada com sucesso!
 *                        codCliente: 1
 *                        codAtivo: 1
 *                        qtdeAtivo: 10
 *              -:
 *                description: Se a quantidade de ativos na corretora for insuficiente
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                      example:
 *                        message: Quantidade de ativos disponível:0
 *              :
 *                description: Se o saldo disponível na carteira for insuficiente
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                      example:
 *                        message: Saldo insuficiente
 */

/**
 * @swagger
 *  /ativos/vender:
 *          post:
 *            tags: [Ativos]
 *            description: Endpoint para venda de ativos
 *            security:
 *              - bearerAuth: []
 *            requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      codCliente:
 *                        type: number
 *                      codAtivo:
 *                        type: number
 *                      qtdeAtivo:
 *                        type: number
 *                    example:
 *                      codCliente: 1 
 *                      codAtivo: 5 
 *                      qtdeAtivo: 8
 *            responses:
 *              201:
 *                description: Se a venda for realizada
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                        codCliente:
 *                          type: number
 *                        codAtivo:
 *                          type: number
 *                        qtdeAtivo:
 *                          type: number
 *                      example:
 *                        message: Venda finalizada com sucesso!
 *                        codCliente: 1
 *                        codAtivo: 1
 *                        qtdeAtivo: 10
 *              :
 *                description: Se a quantidade de ativos na carteira for insuficiente
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                      example:
 *                        message: Quantidade disponível desse ativo para venda:0
 */

/**
 * @swagger
 *  /ativos/conta/{codCliente}:
 *    get:
 *        tags: [Ativos]
 *        description: Endpoint retorna ativos por cliente
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *          - name: codCliente
 *            in: path
 *            type: number
 *            required: true
 *        responses:
 *          200:
 *           description: Se o cliente possuir ativos na carteira
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                    properties:
 *                       codAtivo:
 *                          type: number
 *                       nomeAtivo:
 *                         type: string
 *                       valor:
 *                         type: number
 *                       qtdeAtivo:
 *                         type: number
 *                    example:
 *                      codAtivo: 1
 *                      nameAtivo: JTSA
 *                      valor: 100.50
 *                      qtdeAtivo: 150
 *          :
 *           description: Se o cliente não possuir ativos na carteira
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                 example:
 *                   message: Esse cliente não possui ativos
 */


module.exports = assetRouter;