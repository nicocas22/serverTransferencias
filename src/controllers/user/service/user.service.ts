import { IUser } from "../interface/createUser";
import bcrypt from 'bcrypt';
import User from "../schema/user.schema";
import jwt from 'jsonwebtoken'
import { ISignIn } from "../interface/signinUser";
import { Response } from "express";
let  res:Response;
export class UserService {
    
    async saveUser(user: IUser) {

        try {
            const hash = await this.createHash(user.password);
            const newUser = new User({ ...user, password: hash });

            const userNew = await newUser.save();
            const SecretKey: any = process.env.SECRETKEY;
            const token = jwt.sign({ _id: newUser._id }, SecretKey);

            return { token: token, User: userNew };

        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }

    }

    async updateUser(idUser: number, user: IUser) {
        try {
            const hash = await this.createHash(user.password);
            const updateUser = new User({ ...user, password: hash });

            return await User.findByIdAndUpdate(idUser, updateUser, { new: true });

        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }
    }

    async deleteUser(idUser: number) {
        try {
            await User.findByIdAndDelete(idUser);
            return { status: 200, msg: 'Usuario Eliminado' }
        } catch (error: any) {
            return { status: 404, msg: error.message }
        }

    }

    async findAll() {
        try {
            const listUser = await User.find();
            return listUser;
        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }

    }
    async findByUserFraud() {
        try {
            const listFraud = await User.find({fraud: true});
            return listFraud;
        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }
    }
    async findById(idUser: number) {
        try {
            return await User.findById(idUser);
        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }
    }

    async findByRut(rutUser: number) {
        try {
            return await User.find({ rut: rutUser });
        } catch (error: any) {
            return res.status(404).json({ status: 404, msg: error.message })
        }
    }

    async signin(data: ISignIn) {
        try {
            const { rut, password } = data;
            const hashPass: any = await this.createHash(password);
            const user = await User.findOne({ rut: rut });
            if (!user) return res.status(404).json({ status: 404, msg:"El rut no se encuentra" });
            const passOK = await bcrypt.compare(password, user.password);
            if (!passOK) return res.status(404).json({ status: 404, msg: "Contraseña erronea" });
            const SecretKey: any = process.env.SECRETKEY;

            const token = jwt.sign({ _id: user._id }, SecretKey);
            return token
        } catch (error: any) {
            res.status(404).json({ status: 404, msg: error.message })
        }
    }

    private async createHash(password: any) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    public async updateStatusFraude(idUser: any) {
        try {
            const user: any = await User.findById(idUser);
            let updateUser: any = new User({...user, fraud: true });
            //Genere este obj por que el udpate User me modificaba el id del usaurio por lo tanto hacia tope y no actualizaba
            let obj: any = {}
            obj.fraud = updateUser.fraud
            const updateUserOk = await User.findByIdAndUpdate(idUser, obj, { new: true });
            return updateUserOk

        } catch (error: any) {
            res.status(404).json({ status: 404, msg: error.message })
        }
    }


}