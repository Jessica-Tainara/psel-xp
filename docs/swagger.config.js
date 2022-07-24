const swaggerConfig = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Processo seletivo XP",
            description: "API conectada a um banco de dados",
            version: "1.0"
        },
        servers: [{
            url:"https://psel-xp-jessica-tainara.herokuapp.com/ativoshttps://psel-xp-jessica-tainara.herokuapp.com/",
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