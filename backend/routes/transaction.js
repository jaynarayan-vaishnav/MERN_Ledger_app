import express from 'express';
import {
  addTransaction,
  getTransactionsByLedger,
  generatePDFReport,
} from '../controllers/transactionController.js'; // Update import path as necessary

const router = express.Router();

router.post('/', addTransaction);                             // POST /api/transaction
router.get('/:ledgerId', getTransactionsByLedger);           // GET /api/transaction/:ledgerId
router.get('/:ledgerId/report', generatePDFReport);         // GET /api/transaction/:ledgerId/report

export default router;
