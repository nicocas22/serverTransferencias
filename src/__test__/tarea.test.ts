import request from "supertest";
import app from "../app";


//Test for agregar 
describe('POST /agregar Status 200', () => {
    const data = {
        titulo: 'Primera Prueba',descripcion: "Nueva Descripcion", vigente: true
    }
    it("Responde un JSON con sucess: si se puede realizar Agregar tarea", () => {
        request(app).post("/tareas/agregar").send(data).expect('Content-Type', /json/).expect(200).end((err) => {
            if(err){
                console.log(err);
            }
        })
    })
})
