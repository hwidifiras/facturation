import React from 'react';

const SearchFilters = ({ 
  filter, 
  setFilter, 
  isLoading, 
  searchTerm, 
  setSearchTerm, 
  showFilters, 
  setShowFilters,
  documentTypeFilter,
  setDocumentTypeFilter,
  dateRangeFilter,
  setDateRangeFilter,
  clientFilter,
  setClientFilter,
  clearFilters 
}) => {
  return (
    <div className="search-filters-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Rechercher par numéro, client, email, MF..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="filter-toggle-btn"
        >
          {showFilters ? 'Masquer' : 'Afficher'} Filtres
        </button>
      </div>

      {showFilters && (
        <div className="advanced-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Type de document:</label>
              <select 
                value={documentTypeFilter} 
                onChange={(e) => setDocumentTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Tous les types</option>
                <option value="facture">Factures</option>
                <option value="devis">Devis</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Client:</label>
              <input
                type="text"
                placeholder="Filtrer par client..."
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Date de début:</label>
              <input
                type="date"
                value={dateRangeFilter.start}
                onChange={(e) => setDateRangeFilter(prev => ({ ...prev, start: e.target.value }))}
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label>Date de fin:</label>
              <input
                type="date"
                value={dateRangeFilter.end}
                onChange={(e) => setDateRangeFilter(prev => ({ ...prev, end: e.target.value }))}
                className="filter-input"
              />
            </div>

            <button onClick={clearFilters} className="clear-filters-btn">
              Effacer les filtres
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;

