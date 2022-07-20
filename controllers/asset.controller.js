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

module.exports = assetRouter;