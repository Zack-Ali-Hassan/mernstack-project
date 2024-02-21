import chalk from 'chalk';
import mongoose from 'mongoose';
import { mongo_url } from './config.js';

const connectDB = async ()=>{
    try {
        await mongoose.connect(mongo_url)
        console.log(`${chalk.green.bold("Connection successfully")}`)
    } catch (error) {
        console.log(`${chalk.red.bold("Connection error:")} ${error}`)
        process.exit();
    }
   
}
export default connectDB;