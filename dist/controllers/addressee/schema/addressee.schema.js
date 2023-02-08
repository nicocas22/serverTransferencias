"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addresseeSchema = new mongoose_1.Schema({
    rut: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    idSender: {
        type: String,
        required: true,
    },
    account: {
        type: Number,
        required: true
    },
    bank: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Addressee', addresseeSchema);
