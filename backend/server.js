import express from 'express';
import connectDB from './config/db.js';
import { PORT } from './config/config.js';
import { registerUser } from './controllers/userController.js';
const app = express();
app.use(express.json());
app.get('/api', (req,res)=>{
    res.json("FIRST PAGE IS COMMING NOW.....");
})
app.post('/api/register-user',registerUser)
connectDB();
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})