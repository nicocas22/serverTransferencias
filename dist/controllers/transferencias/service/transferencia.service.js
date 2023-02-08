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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferService = void 0;
const user_service_1 = require("../../user/service/user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transfer_schema_1 = __importDefault(require("../schema/transfer.schema"));
const serviceUser = new user_service_1.UserService();
class TransferService {
    saveTransfer(transfer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTransfer = new transfer_schema_1.default(Object.assign(Object.assign({}, transfer), { date: Date.now() }));
                const thisFraude = yield this.alertFraude(transfer.idSender);
                thisFraude == true ? yield serviceUser.updateStatusFraude(transfer.idSender) : null;
                return yield newTransfer.save();
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listTransfer = yield transfer_schema_1.default.find();
                return listTransfer;
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findById(idTransfer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transfer_schema_1.default.findById(idTransfer);
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findByRutAddressee(rutAddressee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transfer_schema_1.default.find({ rutAddressee: rutAddressee });
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findByIdSender(idSender) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.SECRETKEY;
                const payload = jsonwebtoken_1.default.verify(idSender, secret);
                return yield transfer_schema_1.default.find({ idSender: payload._id });
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    //Ejecutar cada vez que se haga una transferencia
    alertFraude(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const transfer = yield transfer_schema_1.default.find({ idSender: idUser, amount: { $gte: 100000 } });
            const arrFraud = [];
            transfer.forEach(e => {
                arrFraud.push({ rutAddressee: e.rutAddressee, idSender: e.idSender });
            });
            if (arrFraud.length > 0) {
                const search = arrFraud.reduce((ac, transfers) => {
                    const key = JSON.stringify(transfers);
                    ac[key] = ++ac[key] || 0;
                    return ac;
                });
                const duplicate = arrFraud.filter((trans) => {
                    return search[JSON.stringify(trans)];
                });
                const result = {};
                duplicate.forEach((e) => (result[e.rutAddressee] = result[e.rutAddressee] + 1 || 1));
                const arrAlert = [];
                for (let e in result) {
                    arrAlert.push({ rutAddresse: e, total: result[e] });
                }
                const arrFraude = [];
                arrAlert.forEach(e => {
                    e.total >= 3 ? arrFraude.push(e) : null;
                });
                return arrFraude.length >= 1 ? true : false;
            }
            return false;
        });
    }
}
exports.TransferService = TransferService;
