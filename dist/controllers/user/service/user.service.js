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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = __importDefault(require("../schema/user.schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let res;
class UserService {
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield this.createHash(user.password);
                const newUser = new user_schema_1.default(Object.assign(Object.assign({}, user), { password: hash }));
                const userNew = yield newUser.save();
                const SecretKey = process.env.SECRETKEY;
                const token = jsonwebtoken_1.default.sign({ _id: newUser._id }, SecretKey);
                return { token: token, User: userNew };
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    updateUser(idUser, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hash = yield this.createHash(user.password);
                const updateUser = new user_schema_1.default(Object.assign(Object.assign({}, user), { password: hash }));
                return yield user_schema_1.default.findByIdAndUpdate(idUser, updateUser, { new: true });
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    deleteUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_schema_1.default.findByIdAndDelete(idUser);
                return { status: 200, msg: 'Usuario Eliminado' };
            }
            catch (error) {
                return { status: 404, msg: error.message };
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listUser = yield user_schema_1.default.find();
                return listUser;
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    findByUserFraud() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listFraud = yield user_schema_1.default.find({ fraud: true });
                return listFraud;
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    findById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.findById(idUser);
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    findByRut(rutUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_schema_1.default.find({ rut: rutUser });
            }
            catch (error) {
                return res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    signin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rut, password } = data;
                const hashPass = yield this.createHash(password);
                const user = yield user_schema_1.default.findOne({ rut: rut });
                if (!user)
                    return res.status(404).json({ status: 404, msg: "El rut no se encuentra" });
                const passOK = yield bcrypt_1.default.compare(password, user.password);
                if (!passOK)
                    return res.status(404).json({ status: 404, msg: "Contraseña erronea" });
                const SecretKey = process.env.SECRETKEY;
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, SecretKey);
                return token;
            }
            catch (error) {
                res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
    createHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            return hash;
        });
    }
    updateStatusFraude(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.default.findById(idUser);
                let updateUser = new user_schema_1.default(Object.assign(Object.assign({}, user), { fraud: true }));
                //Genere este obj por que el udpate User me modificaba el id del usaurio por lo tanto hacia tope y no actualizaba
                let obj = {};
                obj.fraud = updateUser.fraud;
                const updateUserOk = yield user_schema_1.default.findByIdAndUpdate(idUser, obj, { new: true });
                return updateUserOk;
            }
            catch (error) {
                res.status(404).json({ status: 404, msg: error.message });
            }
        });
    }
}
exports.UserService = UserService;
