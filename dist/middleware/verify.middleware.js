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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
module.exports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.auth)
        return res.status(401).json({ msg: "No Autorizado" });
    const auth = req.headers.auth;
    const token = auth.split(' ')[1];
    if (token === 'null')
        return res.status(401).json({ msg: "No Autorizado" });
    const secret = process.env.SECRETA;
    const payload = jsonwebtoken_1.default.verify(token, secret);
    req.userId = payload._id;
    next();
});
