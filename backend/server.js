import express from 'express';
import connectDB from './config/db.js';
import { PORT } from './config/config.js';
import { registerUser } from './controllers/userController.js';
import userRouter from './routers/userRouter.js';
const app = express();
app.use(express.json());
app.use('/api/user',userRouter)
app.use((req,res)=>{
    res.status(404).json("Page not Found..")
})
connectDB();
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})