const express = require('express');
const serviceClient = require('../services/client.service');

const clientRouter = express.Router();

clientRouter.post('/deposito', async (req, res) => {
    const response = await serviceClient.deposit(req.body);
    return res.status(201).json(response);
});

clientRouter.post('/saque', async (req, res) => {
    const response = await serviceClient.withdraw(req.body);
    return res.status(201).json(response);
});

module.exports = clientRouter;