const express = require('express');
require('express-async-errors');
const routers = require('./router');
const middlewareError = require('./middleware/middleware.error')
const app = express();

app.use(express.json());
app.use(routers);
app.use(middlewareError);
module.exports = app;