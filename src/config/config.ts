import { config } from "dotenv";
config();

export const PORT = process.env.PORT ;
export const MONGODB_URI: any = process.env.MONGODB_URI