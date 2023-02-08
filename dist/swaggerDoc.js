"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tareas Api",
            version: "1.0.0",
            description: "Documentacion api para Transferencias"
        },
        servers: [
            { url: 'http://localhost:3000' },
        ],
    },
    apis: ['./app.ts']
};
const apiSpecification = (0, swagger_jsdoc_1.default)(options);
exports.default = module.exports = (app) => {
    app.use('/apiDocs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(apiSpecification));
};
