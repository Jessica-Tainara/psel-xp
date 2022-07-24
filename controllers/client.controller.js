const express = require('express');
const serviceClient = require('../services/client.service');
const validateSaqueDeposito = require('../middleware/validate.deposit-saque');
const authMiddleware = require('../middleware/middleware.auth.token');

const clientRouter = express.Router();

clientRouter.post('/deposito', validateSaqueDeposito, async (req, res) => {
  const response = await serviceClient.deposit(req.body);
  return res.status(201).json(response);
});

clientRouter.post('/saque', authMiddleware, validateSaqueDeposito, async (req, res) => {
  const response = await serviceClient.withdraw(req.body, res.locals.payload);
  return res.status(201).json(response);
});

clientRouter.get('/saldo/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await serviceClient.balance(id, res.locals.payload);
  return res.status(200).json(response);
});

clientRouter.get('/historico/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await serviceClient.history(id, res.locals.payload);
  return res.status(200).json(response);
});

/**
 * @swagger
 *  tags:
 *       name: Cliente
 *       description: Endpoint de clientes
 */

/**
 * @swagger
 *  /registrar:
 *          post:
 *            tags: [Cliente]
 *            description: Endpoint para registrar um cliente
 *            requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                      pasword:
 *                        type: string
 *                      fullName:
 *                        type: string
 *                    example:
 *                      email: jhg@test.com
 *                      password: password
 *                      fullName: Jessica Tainara
 *            responses:
 *              201:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        codCliente:
 *                          type: number
 *                        token:
 *                          type: string
 *                      example:
 *                        codClient: 1
 *                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implc3NpY2FAdGVzdC5jb20iLCJmdWxsTmFtZSI6Ikplc3NpY2EiLCJpYXQiOjE2NTg2NDAwNTksImV4cCI6MTY1ODY1NDQ1OX0.gBbIYaNJ9IZa5ESVkdfleYofD19u3yVNSVxWFBlwmhY"
 *                  
 */

/**
 * @swagger
 *  /entrar:
 *          post:
 *            tags: [Cliente]
 *            description: Endpoint para fazer login
 *            requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      email:
 *                        type: string
 *                      pasword:
 *                        type: string
 *                    example:
 *                      email: jessica@test.com
 *                      password: password
 *            responses:
 *              201:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        codCliente:
 *                          type: number
 *                        token:
 *                          type: string
 *                      example:
 *                        codClient: 1
 *                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Implc3NpY2FAdGVzdC5jb20iLCJmdWxsTmFtZSI6Ikplc3NpY2EiLCJpYXQiOjE2NTg2NDAwNTksImV4cCI6MTY1ODY1NDQ1OX0.gBbIYaNJ9IZa5ESVkdfleYofD19u3yVNSVxWFBlwmhY"
 *                  
 */

/**
 * @swagger
 *  /conta/deposito:
 *          post:
 *            tags: [Cliente]
 *            description: Endpoint para deposito
 *            requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      codCliente:
 *                        type: number
 *                      valor:
 *                        type: number
 *                    example:
 *                      codCliente: 1
 *                      valor: 500.00
 *            responses:
 *              201:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: number
 *                        saldo:
 *                          type: number
 *                      example:
 *                        mesage: Depósito finalizado com sucesso!
 *                        saldo: 3000.00
 *                  
 */

/**
 * @swagger
 *  /conta/saque:
 *          post:
 *            tags: [Cliente]
 *            description: Endpoint para saque
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
 *                      valor:
 *                        type: number
 *                    example:
 *                      codCliente: 1
 *                      valor: 500.00
 *            responses:
 *              201:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                        saldo:
 *                          type: number
 *                      example:
 *                        message: Saque finalizado com sucesso!
 *                        saldo: 1500.00
 *                  
 */

/**
 * @swagger
 *  /conta/saldo/{codCliente}:
 *          get:
 *            tags: [Cliente]
 *            description: Endpoint para fazer deposito
 *            parameters:
 *              - name: codCliente
 *                in: path
 *                type: number
 *                required: true
 *            security:
 *              - bearerAuth: []
 *            responses:
 *              201:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        codCliente:
 *                          type: number
 *                        saldo:
 *                          type: number
 *                      example:
 *                        codCliente: 1
 *                        saldo: 3000.00
 *                  
 */

/**
 * @swagger
 *  /conta/historico/{codCliente}:
 *          get:
 *            tags: [Cliente]
 *            description: Endpoint para fazer deposito
 *            parameters:
 *              - name: codCliente
 *                in: path
 *                type: number
 *                required: true
 *            security:
 *              - bearerAuth: []
 *            responses:
 *              201:
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          properties:
 *                            codTransacao:
 *                              type: number
 *                            tipoTransacao:
 *                              type: string
 *                            valor:
 *                              type: number
 *                            detalhes:
 *                              type: string
 *                          example:
 *                           codTransacao: 1
 *                           tipoTransacao: Depósito
 *                           valor: 500.50
 *                           detalhes:
 *                  
 */
module.exports = clientRouter;