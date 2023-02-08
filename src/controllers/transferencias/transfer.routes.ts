import { Router } from "express";

import { TransferController } from "./transferencia.controller";

const router = Router();
const transferController = new TransferController();
router.post('/', transferController.createUser);
router.get('/searchForAddressee/:rutAddressee', transferController.findByRutAddressee);
router.get('/', transferController.findAll);
router.get('/searchForSender/:idSender', transferController.findByIdSender);

module.exports = router

