"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    account: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    rut: {
        type: Number,
        required: true,
        unique: true
    },
    bank: {
        type: String,
        required: true
    },
    fraud: {
        type: Boolean,
        default: false
    }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
