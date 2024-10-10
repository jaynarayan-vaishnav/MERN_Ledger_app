import mongoose from 'mongoose';

const ledgerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false }, // Add this line
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Ledger', ledgerSchema); // Use 'Ledger' with capital 'L' for convention
