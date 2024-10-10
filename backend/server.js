// import express from 'express';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';

// dotenv.config();
    
// const app = express();

// app.get("/MERN_Ledger_app", (req, res) => {});

// app.listen(5000, () => {
//     connectDB();
//     console.log('Server is running on port 5000');
// }); 


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Keep it as a named export like in the working example
import ledgerRoute from './routes/ledger.js';  // Ensure these files exist and paths are correct
import transactionRoute from './routes/transaction.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/ledger', ledgerRoute);
app.use('/api/transaction', transactionRoute);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('MERN Ledger App Backend');
});

// Handle undefined Routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();  // Connect to MongoDB after the server starts, like in the working example
  console.log(`Backend server running on port ${PORT}`);
});