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
exports.TransferController = void 0;
const transferencia_service_1 = require("./service/transferencia.service");
const services = new transferencia_service_1.TransferService();
class TransferController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transfer = yield services.saveTransfer(req.body);
                return res.status(200).json(transfer);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transfer = yield services.findAll();
                return res.status(200).json(transfer);
            }
            catch (error) {
                res.json({ msg: "Se presento un error al Buscar Usuarios" });
            }
        });
        this.findByRutAddressee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rutAddressee = req.params.rutAddressee;
                const transferAddressee = yield services.findByRutAddressee(rutAddressee);
                return res.status(200).json(transferAddressee);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut De Destinatario" });
            }
        });
        this.findByIdSender = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idSender = req.params.idSender;
                const transferRutSender = yield services.findByIdSender(idSender);
                return res.status(200).json(transferRutSender);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut" });
            }
        });
    }
}
exports.TransferController = TransferController;
