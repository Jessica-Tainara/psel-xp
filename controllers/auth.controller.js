const express = require('express');
const serviceClient = require('../services/client.service');
const serviceAuth = require('../services/auth.service');
const validateRegister = require('../middleware/middleware.register.client');

const authController = express.Router();

authController.post('/registrar', validateRegister, async (req, res) => {
  const response = await serviceClient.register(req.body);
  return res.status(201).json(response);
});

authController.post('/entrar', async (req, res) => {
  const response = await serviceAuth.authentication(req.body);
  return res.status(201).json(response);
});

module.exports = authController;