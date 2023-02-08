import { Router } from "express";
const router = Router();

const userRouter = require('../controllers/user/user.routes');
const transferRouter = require('../controllers/transferencias/transfer.routes');
const addresseeRouter = require('../controllers/addressee/addressee.routes');
const bankRouter = require('../controllers/banks/bank.routes');
router.use('/user', userRouter);
router.use('/transfer', transferRouter);
router.use('/addressee', addresseeRouter)
router.use('/bank', bankRouter)
module.exports = router;