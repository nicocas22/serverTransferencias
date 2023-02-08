import { Router } from "express";
import { AddresseeController } from "./addressee.controller";

const router = Router();
const addresseeController = new AddresseeController();
router.post('/', addresseeController.createAddressee);
router.get('/searchForAddressee/:rutAddressee', addresseeController.findByRutAddressee);
router.get('/searchForSender/:idSender', addresseeController.findAll);
router.delete('/:idAddressee', addresseeController.deleteAddressee)
router.put('/ïdAddressee', addresseeController.updateAddressee)
module.exports = router

