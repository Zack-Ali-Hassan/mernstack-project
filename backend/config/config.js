import dotEnv from 'dotenv';
dotEnv.config();
export const PORT = process.env.PORT_NUMBER;
export const mongo_url = process.env.MONGO_URL;
export const JWT_SECRET =process.env.JWT_SECRET;
export const CLOUDINARY_ClOUD_NAME =process.env.CLOUDINARY_ClOUD_NAME;
export const CLOUDINARY_API_KEY =process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET =process.env.CLOUDINARY_API_SECRET;