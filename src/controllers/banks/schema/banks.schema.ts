import { model, Schema, Document } from 'mongoose';


const bankSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
})

export default model('Bank', bankSchema)