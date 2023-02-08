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
exports.BankService = void 0;
const banks_schema_1 = __importDefault(require("../schema/banks.schema"));
let res;
class BankService {
    saveBank(banks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let arrbank = [];
                yield banks.names.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    const newbanks = new banks_schema_1.default({ name: e });
                    const bankNew = yield newbanks.save();
                    arrbank.push(bankNew);
                }));
                return arrbank;
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    findAllBank() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield banks_schema_1.default.find();
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
}
exports.BankService = BankService;
