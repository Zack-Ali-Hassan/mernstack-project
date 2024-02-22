import dotEnv from 'dotenv';
dotEnv.config();
export const PORT = process.env.PORT_NUMBER;
export const mongo_url = process.env.MONGO_URL;
export const JWT_SECRET =process.env.JWT_SECRET;