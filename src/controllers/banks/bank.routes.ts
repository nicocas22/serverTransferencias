import { Router } from "express";

import { BankController } from "./bank.controller";

const router = Router();
const bankController = new BankController();
router.post('/', bankController.createBank);
router.get('/', bankController.findAll);
module.exports = router

