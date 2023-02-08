import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tareas Api",
            version: "1.0.0",
            description: "Documentacion api para Transferencias"
        },
        servers: [
            {url: 'http://localhost:3000'},
        ],
    },
    apis: ['./app.ts']
}

const apiSpecification = swaggerJsDoc(options);


export default module.exports = (app: any) => {
    app.use('/apiDocs', swaggerUI.serve, swaggerUI.setup(apiSpecification))
}