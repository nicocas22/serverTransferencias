"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = require("./config/dbConnection");
const app = (0, express_1.default)();
const swaggerDoc_1 = __importDefault(require("./swaggerDoc"));
const xss = require('xss-clean');
(0, dbConnection_1.connectDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Proteccion Xss
app.use(xss());
//EndPoints
app.use('/api', require('./routes/index.routes'));
(0, swaggerDoc_1.default)(app);
exports.default = app;
