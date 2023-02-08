import { model, Schema, Document } from 'mongoose';


const addresseeSchema = new Schema({
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
})

export default model('Addressee', addresseeSchema)