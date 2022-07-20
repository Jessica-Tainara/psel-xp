const express = require('express');
const serviceClient = require('../services/client.service');
const validateSaqueDeposito = require('../middleware/validate.deposit-saque');

const clientRouter = express.Router();

clientRouter.post('/deposito', validateSaqueDeposito, async (req, res) => {
    const response = await serviceClient.deposit(req.body);
    return res.status(201).json(response);
});

clientRouter.post('/saque', validateSaqueDeposito, async (req, res) => {
    const response = await serviceClient.withdraw(req.body);
    return res.status(201).json(response);
});

clientRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await serviceClient.balance(id);
    return res.status(200).json(response);
});

clientRouter.get('/historico/:id', async (req, res) => {
    const { id } = req.params;
    const response = await serviceClient.history(id);
    return res.status(200).json(response);
});

clientRouter.post('/', async (req, res) => {
    const response = await serviceClient.register(req.body);
    return res.status(201).json(response);
});

module.exports = clientRouter;