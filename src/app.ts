import express from 'express'
import cors from 'cors';
import { connectDB } from "./config/dbConnection";
const app = express()
import swaggerDoc from './swaggerDoc'
const xss = require('xss-clean');


connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//Proteccion Xss
app.use(xss())

//EndPoints
app.use('/api', require('./routes/index.routes'));


swaggerDoc(app)
 
export default app;