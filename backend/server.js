const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/facture';
console.log('🔗 Attempting to connect to MongoDB...');
console.log('📡 Connection string:', mongoURI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Invoice/Devis Model - Exact same structure as your frontend
const invoiceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  invoice_number: {
    type: String,
    required: [true, 'Invoice number is required'],
    trim: true
  },
  date: {
    type: String, // Keep as string to match your frontend format
    required: [true, 'Date is required']
  },
  client_name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  client_address: {
    type: String,
    trim: true,
    default: ''
  },
  client_email: {
    type: String,
    trim: true,
    default: ''
  },
  client_mf: {
    type: String,
    trim: true,
    default: ''
  },
  items: [{
    description: {
      type: String,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    manDays: {
      type: Number,
      required: true,
      min: 1
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  timbre: {
    type: Number,
    default: 1.000
  },
  tax_rate: {
    type: Number,
    default: 19
  },
  total_ht: {
    type: Number,
    required: true
  },
  tva: {
    type: Number,
    required: true
  },
  total_ttc: {
    type: Number,
    required: true
  },
  document_type: {
    type: String,
    required: true,
    enum: ['facture', 'devis']
  },
  created_at: {
    type: String,
    default: () => new Date().toISOString()
  },
  updated_at: {
    type: String,
    default: () => new Date().toISOString()
  }
}, {
  timestamps: false // We handle timestamps manually to match your format
});

const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices');

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'MongoDB Atlas Connected' });
});

// Invoice Routes - Compatible with your existing frontend

// POST /api/invoices - Create a new invoice/devis
app.post('/api/invoices', async (req, res) => {
  try {
    const invoiceData = req.body;
    
    // Validate required fields
    if (!invoiceData.invoice_number || !invoiceData.client_name) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide invoice_number and client_name.' 
      });
    }

    // Ensure created_at and updated_at are set
    if (!invoiceData.created_at) {
      invoiceData.created_at = new Date().toISOString();
    }
    invoiceData.updated_at = new Date().toISOString();

    const invoice = new Invoice(invoiceData);
    const savedInvoice = await invoice.save();
    
    res.status(201).json({
      message: `${invoiceData.document_type || 'Document'} created successfully`,
      id: savedInvoice.id,
      invoice: savedInvoice
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Invoice ID already exists' });
    }
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/invoices - Get all invoices and devis
app.get('/api/invoices', async (req, res) => {
  try {
    const { id } = req.query;
    
    if (id) {
      // Get single invoice by custom id field
      const invoice = await Invoice.findOne({ id: id });
      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }
      return res.json(invoice);
    } 
    // Get all invoices sorted by creation date (newest first)
    const invoices = await Invoice.find().sort({ created_at: -1 });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/invoices/:id - Get one invoice by custom id
app.get('/api/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ id: req.params.id });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/invoices/:id - Update an invoice
app.put('/api/invoices/:id', async (req, res) => {
  try {
    const updateData = req.body;
    
    // Add updated timestamp
    updateData.updated_at = new Date().toISOString();

    const invoice = await Invoice.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({
      message: `${invoice.document_type} updated successfully`,
      invoice: invoice
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/invoices/:id - Delete an invoice
app.delete('/api/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({ id: req.params.id });
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({
      message: `${invoice.document_type} deleted successfully`,
      invoice: invoice
    });
  } catch (error) {
     console.error('Error deleting invoice:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
});
