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
exports.UserController = void 0;
const user_service_1 = require("./service/user.service");
const services = new user_service_1.UserService();
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services.saveUser(req.body);
                return res.json(user);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
            }
        });
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services.findAll();
                return res.status(200).json(users);
            }
            catch (error) {
                res.json({ msg: "Se presento un error al Buscar Usuarios" });
            }
        });
        this.findByRut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rut = req.params.rut;
                const userRut = yield services.findByRut(rut);
                return res.status(200).json(userRut);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut" });
            }
        });
        this.findUserFraud = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersFrauds = yield services.findByUserFraud();
                return res.status(200).json(usersFrauds);
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut" });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = req.params.idUser;
                const userDelete = yield services.deleteUser(idUser);
                return res.status(200).json({ msg: userDelete });
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al eliminar Usuario" });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.idUser;
                const bodyUserUpdate = req.body;
                const userUpdate = yield services.updateUser(id, bodyUserUpdate);
                return res.status(200).json({ msg: "El Usuario fue actualizado", infoUser: userUpdate });
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al actualizar Usuario" });
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const signIn = yield services.signin(req.body);
                return res.status(200).json({ msg: "Usuario Logeado", token: signIn });
            }
            catch (error) {
                res.status(404).json({ msg: "Se presento un error al Logear Usuario" });
            }
        });
    }
}
exports.UserController = UserController;
