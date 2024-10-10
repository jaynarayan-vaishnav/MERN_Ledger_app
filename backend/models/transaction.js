import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  ledger: { type: mongoose.Schema.Types.ObjectId, ref: 'Ledger', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['Given', 'Taken'], required: true },
});


export default mongoose.model('Transaction', transactionSchema);
