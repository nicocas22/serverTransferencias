import { model, Schema, Document } from 'mongoose';


const userSchema = new Schema({
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

})

export default model('User', userSchema)