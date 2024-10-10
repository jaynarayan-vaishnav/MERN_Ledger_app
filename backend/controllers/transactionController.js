import Transaction from '../models/transaction.js'; // Adjust the path as necessary
import Ledger from '../models/ledger.js'; // Adjust the path as necessary
import PDFDocument from 'pdfkit';

// Add a transaction to a ledger
export const addTransaction = async (req, res) => {
  try {
    const { ledger, date, description, amount, type } = req.body;

    // Check if ledger exists
    const ledgerExists = await Ledger.findById(ledger);
    if (!ledgerExists) {
      return res.status(404).json({ message: 'Ledger not found' });
    }

    const transaction = new Transaction({ ledger, date, description, amount, type });
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get transactions for a ledger within date range
export const getTransactionsByLedger = async (req, res) => {
  try {
    const { ledgerId } = req.params;
    const { startDate, endDate } = req.query;

    // Validate dates
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const transactions = await Transaction.find({
      ledger: ledgerId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate PDF report
export const generatePDFReport = async (req, res) => {
  try {
    const { ledgerId } = req.params;
    const { startDate, endDate } = req.query;

    // Validate dates
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const transactions = await Transaction.find({
      ledger: ledgerId,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    // Fetch ledger details
    const ledger = await Ledger.findById(ledgerId);
    if (!ledger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }

    // Create PDF
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=Ledger_${ledger.name}_Report.pdf`,
      }).end(pdfData);
    });

    // PDF Content
    doc.fontSize(20).text(`Ledger Report: ${ledger.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Description: ${ledger.description || 'N/A'}`);
    doc.text(`Date Range: ${start.toDateString()} - ${end.toDateString()}`);
    doc.moveDown();

    // Table Header
    doc.fontSize(14).text('Transactions:', { underline: true });
    doc.moveDown();

    transactions.forEach((tx) => {
      doc.fontSize(12).text(
        `${tx.date.toDateString()} | ${tx.description || 'N/A'} | ${tx.type} | $${tx.amount.toFixed(2)}`
      );
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
