import { useRef } from 'react';
import { useInvoiceHistory } from './hooks/useInvoiceHistory';
import { formatDate, formatAmountInWords } from './utils/invoiceUtils';
import { saveAsPDF } from './utils/pdfUtils';
import SearchFilters from './components/SearchFilters';
import ResultsSummary from './components/ResultsSummary';
import HistoryTable from './components/HistoryTable';
import Pagination from './components/Pagination';
import InvoiceView from './components/InvoiceView';
import EditInvoice from './components/EditInvoice';

function InvoiceHistory() {
  const componentRef = useRef();

  const {
    // State
    selectedInvoice,
    editInvoice,
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
    setErrors,
    setCurrentPage,
    setItemsPerPage,
    setSearchTerm,
    setDocumentTypeFilter,
    setDateRangeFilter,
    setClientFilter,
    setShowFilters,

    // Functions
    viewInvoice,
    editInvoiceDetails,
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
  } = useInvoiceHistory();

  const handleSaveAsPDF = () => {
    saveAsPDF(selectedInvoice, componentRef);
  };

  return (
    <div className="invoice-history-container">
      <h2 className="text-2xl font-bold mb-4">Historique des Documents</h2>
      
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        documentTypeFilter={documentTypeFilter}
        setDocumentTypeFilter={setDocumentTypeFilter}
        dateRangeFilter={dateRangeFilter}
        setDateRangeFilter={setDateRangeFilter}
        clientFilter={clientFilter}
        setClientFilter={setClientFilter}
        clearFilters={clearFilters}
      />

      <ResultsSummary
        filteredInvoices={filteredInvoices}
        searchTerm={searchTerm}
        documentTypeFilter={documentTypeFilter}
        dateRangeFilter={dateRangeFilter}
        clientFilter={clientFilter}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <div className="main-content-layout">
        <div className="history-section">
          <HistoryTable
            paginatedInvoices={paginatedInvoices}
            selectedInvoice={selectedInvoice}
            handleSort={handleSort}
            getSortIcon={getSortIcon}
            viewInvoice={viewInvoice}
            editInvoiceDetails={editInvoiceDetails}
            formatDate={formatDate}
          />
          
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <InvoiceView
          selectedInvoice={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
          saveAsPDF={handleSaveAsPDF}
          componentRef={componentRef}
          formatDate={formatDate}
          formatAmountInWords={formatAmountInWords}
        />
            </div>

      <EditInvoice
        editInvoice={editInvoice}
        setEditInvoice={setEditInvoice}
        saveEdits={saveEdits}
        isLoading={isLoading}
        errors={errors}
        handleInputChange={handleInputChange}
        handleItemChange={handleItemChange}
        addItem={addItem}
        removeItem={removeItem}
        calculateTotalHT={calculateTotalHT}
        calculateTVA={calculateTVA}
        calculateTotalTTC={calculateTotalTTC}
        formatAmountInWords={formatAmountInWords}
      />
    </div>
  );
}

export default InvoiceHistory;