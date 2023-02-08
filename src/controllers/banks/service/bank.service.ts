import bcrypt from 'bcrypt';
import Banks from "../schema/banks.schema";
import { Response } from "express";
let res: Response;
export class BankService {

    async saveBank(banks: any) {
        try {
            let arrbank: any = []
            await banks.names.forEach(async (e: any) => {
                const newbanks = new Banks({ name: e });
                const bankNew = await newbanks.save();
                arrbank.push(bankNew)
            });


            return arrbank;

        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }

    }

    async findAllBank() {
        try {
            return await Banks.find();
        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }
    }

}