const express = require('express');
const assetController = require('./controllers/asset.controller');
const clientController = require('./controllers/client.controller');
const authController = require('./controllers/auth.controller');

const routers = express.Router();

routers.use('/ativos', assetController);
routers.use('/conta', clientController);
routers.use('/', authController);


module.exports = routers;