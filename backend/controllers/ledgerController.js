import Ledger from '../models/ledger.js';

// Create a new ledger
export const createLedger = async (req, res) => {
  try {
    const { name, description } = req.body;
    const ledger = new Ledger({ name, description });
    const savedLedger = await ledger.save();
    res.status(201).json(savedLedger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all ledgers
export const getAllLedgers = async (req, res) => {
  try {
    const ledgers = await Ledger.find().sort({ createdAt: -1 });
    res.json(ledgers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single ledger by ID
export const getLedgerById = async (req, res) => {
  try {
    const ledger = await Ledger.findById(req.params.id);
    if (!ledger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }
    res.json(ledger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a ledger
export const updateLedger = async (req, res) => {
  try {
    const { name, description } = req.body;
    const ledger = await Ledger.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!ledger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }
    res.json(ledger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a ledger
export const deleteLedger = async (req, res) => {
  try {
    const ledger = await Ledger.findByIdAndDelete(req.params.id);
    if (!ledger) {
      return res.status(404).json({ message: 'Ledger not found' });
    }
    res.json({ message: 'Ledger deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
