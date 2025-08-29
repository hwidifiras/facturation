import React from 'react';

const Pagination = ({ 
  totalPages, 
  currentPage, 
  setCurrentPage 
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        onClick={() => setCurrentPage(1)} 
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ⏮️ Première
      </button>
      <button 
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ◀️ Précédent
      </button>
      
      <span className="page-info">
        Page {currentPage} sur {totalPages}
      </span>
      
      <button 
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} 
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Suivant ▶️
      </button>
      <button 
        onClick={() => setCurrentPage(totalPages)} 
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Dernière ⏭️
      </button>
    </div>
  );
};

export default Pagination;

