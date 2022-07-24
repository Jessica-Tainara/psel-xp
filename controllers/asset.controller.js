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
 *  components:
 *      schemas:
 *          Ativo:
 *                type: object
 *                properties:
 *                     codAtivo:
 *                       type: number
 *                     nomeAtivo: 
 *                       type: string
 *                     qtdeAtivo : 
 *                       type: number
 *                     valor :
 *                       type: number
 */

/**
 * @swagger
 *  /ativos/comprar:
 *          post:
 *            tags: [Ativos]
 *            description: Endpoint para fazer deposito
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
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                      example:
 *                        message: Compra finalizada com sucesso!
 *                  
 */

/**
 * @swagger
 *  /ativos/vender:
 *          post:
 *            tags: [Ativos]
 *            description: Endpoint para fazer deposito
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
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: number
 *                      example:
 *                        message: Venda finalizada com sucesso!
 *                  
 */

/**
 * @swagger
 *  /ativos/conta/{codCliente}:
 *    get:
 *        tags: [Ativos]
 *        description: Endpoint retorna um ativo por cliente
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *          - name: codCliente
 *            in: path
 *            type: number
 *            required: true
 *        responses:
 *          200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Ativo'
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
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/Ativo'
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
 *                        $ref: '#/components/schemas/Ativo'
 */

module.exports = assetRouter;