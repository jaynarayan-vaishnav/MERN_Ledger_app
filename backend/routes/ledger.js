import express from 'express';
import {
  createLedger,
  getAllLedgers,
  getLedgerById,
  updateLedger,
  deleteLedger,
} from '../controllers/ledgerController.js';

const router = express.Router();

router.post('/', createLedger);              // POST /api/ledger
router.get('/', getAllLedgers);              // GET /api/ledger
router.get('/:id', getLedgerById);           // GET /api/ledger/:id
router.put('/:id', updateLedger);            // PUT /api/ledger/:id
router.delete('/:id', deleteLedger);         // DELETE /api/ledger/:id

export default router;
