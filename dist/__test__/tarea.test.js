"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
//Test for agregar 
describe('POST /agregar Status 200', () => {
    const data = {
        titulo: 'Primera Prueba', descripcion: "Nueva Descripcion", vigente: true
    };
    it("Responde un JSON con sucess: si se puede realizar Agregar tarea", () => {
        (0, supertest_1.default)(app_1.default).post("/tareas/agregar").send(data).expect('Content-Type', /json/).expect(200).end((err) => {
            if (err) {
                console.log(err);
            }
        });
    });
});
