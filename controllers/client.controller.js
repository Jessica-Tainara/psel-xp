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


module.exports = clientRouter;