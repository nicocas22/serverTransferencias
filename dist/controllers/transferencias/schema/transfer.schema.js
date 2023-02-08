"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transferSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    rutAddressee: {
        type: String,
        required: true,
    },
    idSender: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Transfer', transferSchema);
