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
exports.BankController = void 0;
const bank_service_1 = require("./service/bank.service");
const services = new bank_service_1.BankService();
class BankController {
    constructor() {
        this.createBank = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bank = yield services.saveBank(req.body);
                return res.json(bank);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const banks = yield services.findAllBank();
                return res.status(200).json(banks);
            }
            catch (error) {
                res.json({ msg: "Se presento un error al Buscar Usuarios" });
            }
        });
    }
}
exports.BankController = BankController;
