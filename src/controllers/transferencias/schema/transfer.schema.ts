import { model, Schema, Document } from 'mongoose';


const transferSchema = new Schema({
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


})

export default model('Transfer', transferSchema)