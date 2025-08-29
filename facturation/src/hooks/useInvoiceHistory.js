import { useState, useEffect } from 'react';
import { api } from '../api.js';

export const useInvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Advanced filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [documentTypeFilter, setDocumentTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: '', end: '' });
  const [clientFilter, setClientFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Filter and paginate invoices
  const getFilteredAndPaginatedInvoices = () => {
    let filtered = [...invoices];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.client_mf?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply document type filter
    if (documentTypeFilter !== 'all') {
      filtered = filtered.filter(invoice => invoice.document_type === documentTypeFilter);
    }

    // Apply date range filter
    if (dateRangeFilter.start) {
      filtered = filtered.filter(invoice => invoice.date >= dateRangeFilter.start);
    }
    if (dateRangeFilter.end) {
      filtered = filtered.filter(invoice => invoice.date <= dateRangeFilter.end);
    }

    // Apply client filter
    if (clientFilter) {
      filtered = filtered.filter(invoice => 
        invoice.client_name?.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'created_at' || sortConfig.key === 'date') {
        return sortConfig.direction === 'asc' 
          ? new Date(aValue) - new Date(bValue)
          : new Date(bValue) - new Date(aValue);
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    });

    return filtered;
  };

  const filteredInvoices = getFilteredAndPaginatedInvoices();
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, documentTypeFilter, dateRangeFilter, clientFilter]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDocumentTypeFilter('all');
    setDateRangeFilter({ start: '', end: '' });
    setClientFilter('');
    setCurrentPage(1);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const data = await api.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      alert('Erreur lors du chargement des documents : ' + error.message);
    }
    setIsLoading(false);
  };

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setEditInvoice(null);
  };

  const editInvoiceDetails = (invoice) => {
    setEditInvoice({
      id: invoice.id,
      invoiceNumber: invoice.invoice_number,
      date: invoice.date.split('T')[0],
      clientName: invoice.client_name,
      clientAddress: invoice.client_address,
      clientEmail: invoice.client_email,
      clientMF: invoice.client_mf,
      items: invoice.items.map(item => ({
        description: item.description,
        unitPrice: item.unitPrice,
        manDays: item.quantity || item.manDays,
        total: item.total
      })),
      timbre: invoice.timbre,
      taxRate: invoice.tax_rate || 19,
      documentType: invoice.document_type,
    });
    setSelectedInvoice(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editInvoice.invoiceNumber) newErrors.invoiceNumber = 'Numéro de facture requis';
    if (!editInvoice.clientName) newErrors.clientName = 'Nom du client requis';
    if (!editInvoice.items.some(item => item.description)) newErrors.items = 'Au moins un article avec description est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditInvoice({ ...editInvoice, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...editInvoice.items];
    newItems[index][field] = value;
    if (field === 'unitPrice' || field === 'manDays') {
      newItems[index].total = (newItems[index].unitPrice * newItems[index].manDays).toFixed(2);
    }
    setEditInvoice({ ...editInvoice, items: newItems });
    setErrors({ ...errors, items: '' });
  };

  const addItem = () => {
    setEditInvoice({
      ...editInvoice,
      items: [...editInvoice.items, { description: '', unitPrice: 0, manDays: 1, total: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = editInvoice.items.filter((_, i) => i !== index);
    setEditInvoice({ ...editInvoice, items: newItems });
  };

  const calculateTotalHT = () => {
    return editInvoice.items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2);
  };

  const calculateTVA = () => {
    return (calculateTotalHT() * (parseFloat(editInvoice.taxRate || 19) / 100)).toFixed(2);
  };

  const calculateTotalTTC = () => {
    return (parseFloat(calculateTotalHT()) + parseFloat(calculateTVA()) + parseFloat(editInvoice.timbre || 0)).toFixed(2);
  };

  const saveEdits = async () => {
    if (!validateForm()) return;
    if (!window.confirm(`Confirmer la modification de ce ${editInvoice.documentType} ?`)) return;
    setIsLoading(true);
    try {
      const updatedInvoice = {
        invoice_number: editInvoice.invoiceNumber,
        date: editInvoice.date,
        client_name: editInvoice.clientName,
        client_address: editInvoice.clientAddress,
        client_email: editInvoice.clientEmail,
        client_mf: editInvoice.clientMF,
        items: editInvoice.items,
        timbre: parseFloat(editInvoice.timbre),
        tax_rate: parseFloat(editInvoice.taxRate || 19),
        total_ht: parseFloat(calculateTotalHT()),
        tva: parseFloat(calculateTVA()),
        total_ttc: parseFloat(calculateTotalTTC()),
        document_type: editInvoice.documentType,
      };
      
      await api.updateInvoice(editInvoice.id, updatedInvoice);
      alert(`${editInvoice.documentType.charAt(0).toUpperCase() + editInvoice.documentType.slice(1)} modifié avec succès !`);
      setEditInvoice(null);
      fetchInvoices();
    } catch (error) {
      alert('Erreur lors de la modification : ' + error.message);
    }
    setIsLoading(false);
  };

  return {
    // State
    invoices,
    selectedInvoice,
    editInvoice,
    sortConfig,
    filter,
    isLoading,
    errors,
    currentPage,
    itemsPerPage,
    searchTerm,
    documentTypeFilter,
    dateRangeFilter,
    clientFilter,
    showFilters,
    filteredInvoices,
    totalPages,
    paginatedInvoices,

    // Setters
    setSelectedInvoice,
    setEditInvoice,
    setFilter,
    setErrors,
    setCurrentPage,
    setItemsPerPage,
    setSearchTerm,
    setDocumentTypeFilter,
    setDateRangeFilter,
    setClientFilter,
    setShowFilters,

    // Functions
    fetchInvoices,
    viewInvoice,
    editInvoiceDetails,
    validateForm,
    handleInputChange,
    handleItemChange,
    addItem,
    removeItem,
    calculateTotalHT,
    calculateTVA,
    calculateTotalTTC,
    saveEdits,
    handleSort,
    clearFilters,
    getSortIcon,
  };
};

