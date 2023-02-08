import jwt from 'jsonwebtoken';
import { IAddressee } from '../interfaces/addresse.interface'
import Addressee from '../schema/addressee.schema'

export class AddresseeService {

    async saveAddressee(addressee: IAddressee) {
        try {
            const secret: any = process.env.SECRETKEY;
            const payload: any = jwt.verify(addressee.idSender, secret)
            const newAddressee = new Addressee({...addressee, idSender: payload._id});
            return await newAddressee.save();
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    async updateAddressee(idAddressee: number, addressee: IAddressee) {
        try {
            const updateAddressee = new Addressee({ ...addressee });
            return await Addressee.findByIdAndUpdate(idAddressee, updateAddressee, { new: true });
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    async delete(idAddressee: number) {
        try {
            await Addressee.findByIdAndDelete(idAddressee);
            return { status: 200, msg: 'Destinatario Eliminado' }
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }

    }

    async findAllRutSender(idSender: string) {
        try {
            const secret: any = process.env.SECRETKEY;
            const payload: any = jwt.verify(idSender, secret)
            const listAddressee = await Addressee.find({ idSender: payload._id });
            return listAddressee;
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }

    }

    async findByRut(rutAddressee: number) {
        try {
            return await Addressee.find({ rut: rutAddressee });
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }


}