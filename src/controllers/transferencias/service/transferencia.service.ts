import { UserService } from "../../user/service/user.service";
import jwt from 'jsonwebtoken';
import Transfer from '../schema/transfer.schema';
const serviceUser = new UserService();


export class TransferService {

    async saveTransfer(transfer: any) {
        try {
            const newTransfer = new Transfer({ ...transfer, date: Date.now() });
            const thisFraude = await this.alertFraude(transfer.idSender);
            thisFraude == true ? await serviceUser.updateStatusFraude(transfer.idSender) : null;
            return await newTransfer.save();
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    async findAll() {
        try {
            const listTransfer = await Transfer.find();
            return listTransfer;
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    async findById(idTransfer: number) {
        try {
            return await Transfer.findById(idTransfer);
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    async findByRutAddressee(rutAddressee: string) {
        try {
            return await Transfer.find({ rutAddressee: rutAddressee });
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    async findByIdSender(idSender: any) {
        try {
            const secret: any = process.env.SECRETKEY;
            const payload: any = jwt.verify(idSender, secret)
            return await Transfer.find({ idSender: payload._id });
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }
    }

    //Ejecutar cada vez que se haga una transferencia
    private async alertFraude(idUser: string): Promise<boolean> {
        const transfer = await Transfer.find({ idSender: idUser, amount: { $gte: 100000 } });

        const arrFraud: any = [];
        transfer.forEach(e => {
            arrFraud.push({ rutAddressee: e.rutAddressee, idSender: e.idSender })
        })

        if (arrFraud.length > 0) {
            const search: any = arrFraud.reduce((ac: any, transfers: any) => {
                const key = JSON.stringify(transfers)
                ac[key] = ++ac[key] || 0;
                return ac;
            })

            const duplicate = arrFraud.filter((trans: any) => {
                return search[JSON.stringify(trans)];
            })

            const result: any = {};
            duplicate.forEach((e: any) => (result[e.rutAddressee] = result[e.rutAddressee] + 1 || 1));

            const arrAlert = [];
            for (let e in result) {
                arrAlert.push({ rutAddresse: e, total: result[e] });
            }

            const arrFraude = [];
            arrAlert.forEach(e => {
                e.total >= 3 ? arrFraude.push(e) : null;
            })

            return arrFraude.length >= 1 ? true : false;
        }
        return false;
    }

}