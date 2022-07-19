const express = require('express');
const assetController = require('../controllers/asset.controller');
const clientController = require('../controllers/client.controller');

const routers = express.Router();

routers.use('/ativos', assetController);
routers.use('/conta', clientController);


module.exports = routers;