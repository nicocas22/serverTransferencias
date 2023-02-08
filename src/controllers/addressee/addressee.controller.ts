import { Request, Response } from "express";
import { AddresseeService } from "./services/addressee.service";

const services = new AddresseeService();
export class AddresseeController {
    createAddressee = async (req: Request, res: Response) => {
        try {
            const Addressee = await services.saveAddressee(req.body);
            return res.status(200).json(Addressee);
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const idSender: any = req.params.idSender
            const AddresseeForSender = await services.findAllRutSender(idSender);
            return res.status(200).json(AddresseeForSender);
        } catch (error) {
            res.json({ msg: "Se presento un error al Buscar Addressee" });
        }

    }

    findByRutAddressee = async (req: Request, res: Response) => {
        try {
            const rutAddressee: any = req.params.rutAddressee;
            const transferAddressee = await services.findByRut(rutAddressee);
            return res.status(200).json(transferAddressee)
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Buscar Destinatario Por su rut De Destinatario" });
        }
    }

    deleteAddressee = async (req: Request, res: Response) => {
        try {
            const idAddressee: any = req.params.idAddressee;
            await services.delete(idAddressee);
            res.status(200).json({ msg: "Destinatario Eliminado Correctamente" })
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Eliminar Destinatario Por su rut De Destinatario" });
        }
    }

    updateAddressee = async (req: Request, res: Response) => {
        try {
            const idAddressee: any = req.params.idAddressee;
            const update = await services.updateAddressee(idAddressee, req.body);
            res.status(200).json({ msg: "Destinatario Actualizado Correctamente", update: update })
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Actualizar Destinatario Por su rut De Destinatario" });
        }
    }


}
