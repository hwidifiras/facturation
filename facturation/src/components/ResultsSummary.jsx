import React from 'react';

const ResultsSummary = ({ 
  filteredInvoices, 
  searchTerm, 
  documentTypeFilter, 
  dateRangeFilter, 
  clientFilter,
  itemsPerPage,
  setItemsPerPage 
}) => {
  return (
    <div className="results-summary">
      <span>
        {filteredInvoices.length} document{filteredInvoices.length !== 1 ? 's' : ''} trouvé{filteredInvoices.length !== 1 ? 's' : ''}
        {searchTerm || documentTypeFilter !== 'all' || dateRangeFilter.start || dateRangeFilter.end || clientFilter ? ' (filtré)' : ''}
      </span>
      <div className="items-per-page">
        <label>Par page:</label>
        <select 
          value={itemsPerPage} 
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="items-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default ResultsSummary;

