const swaggerConfig = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Processo seletivo XP",
            description: `Esta API fornece ao cliente acesso aos ativos da corretora e a detalhes de sua conta.
            [Repositório GitHub](https://github.com/Jessica-Tainara/psel-xp)`,
            version: "1.0"
        },
        servers: [{
            url:"https://psel-xp-api.herokuapp.com/",
            description: "servidor web"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ["./controllers/client.controller.js", "./controllers/asset.controller.js"]
}

module.exports = swaggerConfig;