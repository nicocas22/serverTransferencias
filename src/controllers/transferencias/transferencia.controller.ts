import { Request, Response } from "express";
import { TransferService } from "./service/transferencia.service";

const services = new TransferService();
export class TransferController {
    createUser = async (req: Request, res: Response) => {
        try {
            const transfer = await services.saveTransfer(req.body);
            return res.status(200).json(transfer);
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const transfer = await services.findAll();
            return res.status(200).json(transfer);
        } catch (error) {
            res.json({ msg: "Se presento un error al Buscar Usuarios" });
        }

    }

    findByRutAddressee = async (req: Request, res: Response) => {
        try {
            const rutAddressee: any = req.params.rutAddressee;
            const transferAddressee = await services.findByRutAddressee(rutAddressee);
            return res.status(200).json(transferAddressee)
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut De Destinatario" });
        }
    }

    findByIdSender = async (req: Request, res: Response) => {
        try {
            const idSender: any = req.params.idSender;
            const transferRutSender = await services.findByIdSender(idSender);
            return res.status(200).json(transferRutSender)
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut" });
        }
    }


}
