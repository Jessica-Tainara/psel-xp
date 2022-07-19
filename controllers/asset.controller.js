const express = require('express');
const serviceAsset = require('../services/asset.service')
const validateAsset = require('../middleware/validate.buying-assets')

const assetRouter = express.Router();

assetRouter.post('/comprar', validateAsset, async (req, res) => {
    const response = await serviceAsset.buy(req.body);
    return res.status(201).json(response);
});

assetRouter.post('/vender', validateAsset,  async (req, res) => {
    const response = await serviceAsset.sell(req.body);
    return res.status(201).json(response);
});

module.exports = assetRouter;