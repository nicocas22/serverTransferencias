"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post('/', userController.createUser);
router.get('/userfraud', userController.findUserFraud);
router.get('/:rut', userController.findByRut);
router.get('/', userController.findAll);
router.delete('/:idUser', userController.deleteUser);
router.put('/idUser', userController.updateUser);
router.post('/auth/singIn', userController.signIn);
module.exports = router;
