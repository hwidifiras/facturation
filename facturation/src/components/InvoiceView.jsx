import React from 'react';
import logoAcrecert from '../assets/logoAcrecert.png';

const InvoiceView = ({ 
  selectedInvoice, 
  setSelectedInvoice, 
  saveAsPDF, 
  componentRef, 
  formatDate, 
  formatAmountInWords 
}) => {
  if (!selectedInvoice) {
    return (
      <div className="invoice-view-section">
        <div className="invoice-view-header">
          <h3>Document sélectionné</h3>
        </div>
        <div className="invoice-view-content">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#6c757d',
            fontSize: '16px',
            textAlign: 'center',
            padding: '40px'
          }}>
            <div>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
              <p>Sélectionnez un document dans la liste pour le visualiser</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-view-section">
      <div className="invoice-view-header">
        <h3>Document sélectionné</h3>
        <button 
          onClick={() => setSelectedInvoice(null)}
          className="close-btn"
        >
          ✕
        </button>
      </div>
      <div className="invoice-view-content">
        <div className="no-print button-container">
          <button
            onClick={saveAsPDF}
            className="tooltip pdf-btn"
            data-tooltip="Enregistrer en PDF"
          >
            Enregistrer en PDF
          </button>
        </div>
        <div className="invoice-container">
          <div ref={componentRef} className="invoice-preview">
            <div className="header">
              <img src={logoAcrecert} alt="Acrecert Logo" className="logo-placeholder" />
              <div className="yellow-square-top"></div>
              <div className="company-details">
                <p>Bureau de Consulting en Informatique</p>
                <p>MF : 1912549Q/A/M/000</p>
              </div>
            </div>

          <div className="facture-title">{selectedInvoice.document_type.toUpperCase()}</div>

          <div className="invoice-details">
            <div className="left">
              <p><strong>{selectedInvoice.document_type.toUpperCase()} N° :</strong> {selectedInvoice.invoice_number}</p>
              <p><strong>DATE :</strong> {formatDate(selectedInvoice.date)}</p>
            </div>
            <div className="right">
              <p><strong>Client :</strong> {selectedInvoice.client_name}</p>
              <p><strong>Adresse :</strong> {selectedInvoice.client_address}</p>
              <p><strong>Mail :</strong> {selectedInvoice.client_email}</p>
              <p><strong>MF :</strong> {selectedInvoice.client_mf}</p>
            </div>
          </div>

          <table className="items-table">
            <thead>
              <tr>
                <th>Description :</th>
                <th>Prix Unitaire :</th>
                <th>Homme-jour :</th>
                <th>Total :</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.manDays || item.quantity}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="totals-bank-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="payment-info" style={{ width: '60%', minWidth: '200px' }}>
              <h2>{selectedInvoice.document_type === 'facture' ? 'RÈGLEMENT :' : 'INFORMATIONS :'}</h2>
              {selectedInvoice.document_type === 'facture' ? (
                <>
                  <p>Par virement bancaire :</p>
                  <p>Banque : UIB-Teboulba</p>
                  <p>Compte : 12 905 00 00033037045 84</p>
                </>
              ) : (
                <>
                  <p>Devis valable 30 jours</p>
                  <p>Conditions de paiement : 50% à la commande</p>
                  <p>Délai de livraison : Selon disponibilité</p>
                </>
              )}
            </div>
            <div className="totals" style={{ width: '35%', minWidth: '150px' }}>
              <p><strong>TOTAL HT :</strong> {selectedInvoice.total_ht} TND</p>
              <p><strong>TVA {selectedInvoice.tax_rate || 19}% :</strong> {selectedInvoice.tva} TND</p>
              <p><strong>TIMBRE :</strong> {selectedInvoice.timbre} TND</p>
              <p><strong>TOTAL TTC :</strong> {selectedInvoice.total_ttc} TND</p>
              <p className="amount-in-words">
                Arrêtée la présente à la somme de : {formatAmountInWords(selectedInvoice.total_ttc)} TND
              </p>
            </div>
          </div>

          <div className="footer">
            <p><strong>Site web :</strong> www.acrecert.com <span>|</span> <strong>Mail :</strong> contact@acrecert.com <span>|</span> <strong>Adresse :</strong> Cheraf, Bekalta, Monastir</p>
            <p><strong>Tel :</strong> 99 10 99 72 / 99 10 99 87</p>
            <div className="decorative-square"></div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
