"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddresseeController = void 0;
const addressee_service_1 = require("./services/addressee.service");
const services = new addressee_service_1.AddresseeService();
class AddresseeController {
    constructor() {
        this.createAddressee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Addressee = yield services.saveAddressee(req.body);
                return res.status(200).json(Addressee);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idSender = req.params.idSender;
                const AddresseeForSender = yield services.findAllRutSender(idSender);
                return res.status(200).json(AddresseeForSender);
            }
            catch (error) {
                res.json({ msg: "Se presento un error al Buscar Addressee" });
            }
        });
        this.findByRutAddressee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rutAddressee = req.params.rutAddressee;
                const transferAddressee = yield services.findByRut(rutAddressee);
                return res.status(200).json(transferAddressee);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Buscar Destinatario Por su rut De Destinatario" });
            }
        });
        this.deleteAddressee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idAddressee = req.params.idAddressee;
                yield services.delete(idAddressee);
                res.status(200).json({ msg: "Destinatario Eliminado Correctamente" });
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Eliminar Destinatario Por su rut De Destinatario" });
            }
        });
        this.updateAddressee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idAddressee = req.params.idAddressee;
                const update = yield services.updateAddressee(idAddressee, req.body);
                res.status(200).json({ msg: "Destinatario Actualizado Correctamente", update: update });
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Actualizar Destinatario Por su rut De Destinatario" });
            }
        });
    }
}
exports.AddresseeController = AddresseeController;
