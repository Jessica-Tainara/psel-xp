require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = require('./app');
const swaggerConfig = require('./docs/swagger.config')

const port = process.env.PORT || 3000;

const swaggerDoc = swaggerJSDoc(swaggerConfig)
app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc) );


app.listen(port, () => console.log('Ouvindo na porta', port));