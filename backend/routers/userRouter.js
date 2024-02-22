import express from 'express';
import { loginUser, readUser, registerUser } from '../controllers/userController.js';
const userRouter = express.Router();
userRouter.get("/", readUser)
userRouter.post("/register-user", registerUser)
userRouter.post("/login-user", loginUser)
export default userRouter;