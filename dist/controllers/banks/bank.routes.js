"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bank_controller_1 = require("./bank.controller");
const router = (0, express_1.Router)();
const bankController = new bank_controller_1.BankController();
router.post('/', bankController.createBank);
router.get('/', bankController.findAll);
module.exports = router;
