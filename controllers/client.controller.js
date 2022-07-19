const express = require('express');
const serviceClient = require('../services/client.service');

const clientRouter = express.Router();

clientRouter.post('/deposito', async (req, res) => {
    const response = await serviceClient.deposit(req.body);
    return res.status(201).json(response);
});

module.exports = clientRouter;