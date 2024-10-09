import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
    
const app = express();

app.get("/MERN_Ledger_app", (req, res) => {});

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});


