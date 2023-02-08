import { Request, Response } from "express";
import { BankService } from "./service/bank.service";

const services = new BankService();
export class BankController {
    createBank = async (req: Request, res: Response) => {
        try {
            const bank = await services.saveBank(req.body);
            return res.json(bank);
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const banks = await services.findAllBank();
            return res.status(200).json(banks);
        } catch (error) {
            res.json({ msg: "Se presento un error al Buscar Usuarios" });
        }

    }


}
