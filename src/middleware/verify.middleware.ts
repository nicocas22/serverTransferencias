import {Request, Response ,NextFunction } from "express";
import jwt from "jsonwebtoken";

module.exports = async (req: any, res: Response, next: NextFunction) => {
    if(!req.headers.auth) return res.status(401).json({msg: "No Autorizado"})

    const auth: any = req.headers.auth;
    const token = auth.split(' ')[1];

    if (token === 'null' ) return res.status(401).json({msg: "No Autorizado"})
    const secret: any = process.env.SECRETA;
    const payload: any = jwt.verify(token, secret)
    req.userId = payload._id;

    next();

}