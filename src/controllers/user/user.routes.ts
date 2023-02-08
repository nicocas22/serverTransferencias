import { Router } from "express";

import { UserController } from "./user.controller";

const router = Router();
const userController = new UserController();
router.post('/', userController.createUser);
router.get('/userfraud', userController.findUserFraud);
router.get('/:rut', userController.findByRut);
router.get('/', userController.findAll);
router.delete('/:idUser', userController.deleteUser);
router.put('/idUser', userController.updateUser);
router.post('/auth/singIn', userController.signIn)
module.exports = router

