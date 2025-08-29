import React from 'react';

const HistoryTable = ({ 
  paginatedInvoices, 
  selectedInvoice, 
  handleSort, 
  getSortIcon, 
  viewInvoice, 
  editInvoiceDetails, 
  formatDate 
}) => {
  return (
    <div className="table-container">
      <table className="history-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('document_type')} className="sortable">
              Type {getSortIcon('document_type')}
            </th>
            <th onClick={() => handleSort('invoice_number')} className="sortable">
              Numéro {getSortIcon('invoice_number')}
            </th>
            <th onClick={() => handleSort('client_name')} className="sortable">
              Client {getSortIcon('client_name')}
            </th>
            <th onClick={() => handleSort('date')} className="sortable">
              Date {getSortIcon('date')}
            </th>
            <th onClick={() => handleSort('total_ttc')} className="sortable">
              Total TTC {getSortIcon('total_ttc')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
                Aucun document trouvé
              </td>
            </tr>
          ) : (
            paginatedInvoices.map((invoice) => (
              <tr 
                key={invoice.id} 
                className={selectedInvoice?.id === invoice.id ? 'selected-row' : ''}
              >
                <td>
                  <span className={`document-type-badge ${invoice.document_type}`}>
                    {invoice.document_type.charAt(0).toUpperCase() + invoice.document_type.slice(1)}
                  </span>
                </td>
                <td className="invoice-number">{invoice.invoice_number}</td>
                <td className="client-name">{invoice.client_name}</td>
                <td className="date">{formatDate(invoice.date)}</td>
                <td className="total">{invoice.total_ttc} TND</td>
                <td className="actions">
                  <button
                    onClick={() => viewInvoice(invoice)}
                    className="action-btn view-btn tooltip"
                    data-tooltip="Voir le document"
                  >
                    Voir
                  </button>
                  <button
                    onClick={() => editInvoiceDetails(invoice)}
                    className="action-btn edit-btn tooltip"
                    data-tooltip="Modifier le document"
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
