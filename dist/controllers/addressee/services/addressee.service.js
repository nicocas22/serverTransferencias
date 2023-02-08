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
exports.AddresseeService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addressee_schema_1 = __importDefault(require("../schema/addressee.schema"));
class AddresseeService {
    saveAddressee(addressee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.SECRETKEY;
                const payload = jsonwebtoken_1.default.verify(addressee.idSender, secret);
                const newAddressee = new addressee_schema_1.default(Object.assign(Object.assign({}, addressee), { idSender: payload._id }));
                return yield newAddressee.save();
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    updateAddressee(idAddressee, addressee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateAddressee = new addressee_schema_1.default(Object.assign({}, addressee));
                return yield addressee_schema_1.default.findByIdAndUpdate(idAddressee, updateAddressee, { new: true });
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    delete(idAddressee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield addressee_schema_1.default.findByIdAndDelete(idAddressee);
                return { status: 200, msg: 'Destinatario Eliminado' };
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findAllRutSender(idSender) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = process.env.SECRETKEY;
                const payload = jsonwebtoken_1.default.verify(idSender, secret);
                const listAddressee = yield addressee_schema_1.default.find({ idSender: payload._id });
                return listAddressee;
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findByRut(rutAddressee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield addressee_schema_1.default.find({ rut: rutAddressee });
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
}
exports.AddresseeService = AddresseeService;
