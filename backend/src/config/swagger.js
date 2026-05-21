const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "Backend Internship Assignment API"
        },

        servers: [
            {
                url: "https://task-manager-zm40.onrender.com"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;