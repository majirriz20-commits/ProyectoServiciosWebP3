//Importaciones de la libreria
//const { version } = require('react');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Configuracion del Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Documentaición de la API',
        version: '1.0.0',
        description: 'Documentaición de la API con Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desarrollo'
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routers/*.js'], //para trabajarlo como texto normal
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app){
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
