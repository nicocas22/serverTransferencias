import { Request, Response } from "express";
import { UserService } from "./service/user.service";

const services = new UserService();
export class UserController {
    createUser = async (req: Request, res: Response) => {
        try {
            const user = await services.saveUser(req.body);
            return res.json(user);
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al guardar Usuario" });
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const users = await services.findAll();
             return res.status(200).json(users);
        } catch (error) {
            res.json({ msg: "Se presento un error al Buscar Usuarios" });
        }

    }

    findByRut = async (req: Request, res: Response) => {
        try {
            const rut: any = req.params.rut;
            const userRut = await services.findByRut(rut);
            return res.status(200).json(userRut)
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut" });
        }
    }

    findUserFraud = async (req: Request, res: Response) => {
        try {
            const usersFrauds = await services.findByUserFraud();
            return res.status(200).json(usersFrauds)
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Buscar Usuarios Por su rut" });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const idUser: any = req.params.idUser;
            const userDelete = await services.deleteUser(idUser);
            return res.status(200).json({ msg: userDelete })
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al eliminar Usuario" });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const id: any = req.params.idUser;
            const bodyUserUpdate = req.body;
            const userUpdate = await services.updateUser(id, bodyUserUpdate);
            return res.status(200).json({msg: "El Usuario fue actualizado", infoUser: userUpdate})
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al actualizar Usuario" });
        }

    }

    signIn = async (req: Request, res: Response) => {
        try {
            const signIn = await services.signin(req.body);
            return res.status(200).json({msg:"Usuario Logeado", token: signIn})
        } catch (error) {
            res.status(404).json({ msg: "Se presento un error al Logear Usuario" });
        }
    }
}
