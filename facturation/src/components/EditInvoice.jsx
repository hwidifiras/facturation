import React from 'react';
import logoAcrecert from '../assets/logoAcrecert.png';

const EditInvoice = ({ 
  editInvoice, 
  setEditInvoice, 
  saveEdits, 
  isLoading, 
  errors, 
  handleInputChange, 
  handleItemChange, 
  addItem, 
  removeItem, 
  calculateTotalHT, 
  calculateTVA, 
  calculateTotalTTC, 
  formatAmountInWords 
}) => {
  if (!editInvoice) return null;

  return (
    <div className="edit-mode-container">
      <div className="no-print button-container">
        <button
          onClick={saveEdits}
          disabled={isLoading}
          className="tooltip"
          data-tooltip="Enregistrer les modifications"
        >
          Enregistrer
          {isLoading && <span className="loading-spinner"></span>}
        </button>
        <button
          onClick={() => setEditInvoice(null)}
          className="tooltip"
          data-tooltip="Annuler"
        >
          Annuler
        </button>
      </div>
      <div className="invoice-container">
        <div className="header">
          <img src={logoAcrecert} alt="Acrecert Logo" className="logo-placeholder" />
          <div className="yellow-square-top"></div>
          <div className="company-details">
            <p>Bureau de Consulting en Informatique</p>
            <p>MF : 1912549Q/A/M/000</p>
          </div>
        </div>

        <div className="facture-title">{editInvoice.documentType.toUpperCase()}</div>

        <div className="invoice-details">
          <div className="left">
            <p>
              <strong>{editInvoice.documentType.toUpperCase()} N° :</strong>
              <input
                type="text"
                name="invoiceNumber"
                value={editInvoice.invoiceNumber}
                onChange={handleInputChange}
              />
              {errors.invoiceNumber && <span className="error-message">{errors.invoiceNumber}</span>}
            </p>
            <p><strong>DATE :</strong> <input type="date" name="date" value={editInvoice.date} onChange={handleInputChange} /></p>
          </div>
          <div className="right">
            <p>
              <strong>Client :</strong>
              <input
                type="text"
                name="clientName"
                value={editInvoice.clientName}
                onChange={handleInputChange}
              />
              {errors.clientName && <span className="error-message">{errors.clientName}</span>}
            </p>
            <p>
              <strong>Adresse :</strong>
              <textarea
                name="clientAddress"
                value={editInvoice.clientAddress}
                onChange={handleInputChange}
              ></textarea>
            </p>
            <p><strong>Mail :</strong> <input type="email" name="clientEmail" value={editInvoice.clientEmail} onChange={handleInputChange} /></p>
            <p><strong>MF :</strong> <input type="text" name="clientMF" value={editInvoice.clientMF} onChange={handleInputChange} /></p>
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
            {editInvoice.items.map((item, index) => (
              <tr key={index}>
                <td><input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
                <td><input type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} min="0" step="0.01" /></td>
                <td><input type="number" value={item.manDays} onChange={(e) => handleItemChange(index, 'manDays', e.target.value)} min="1" /></td>
                <td>{item.total}</td>
                {editInvoice.items.length > 1 && (
                  <td className="no-print">
                    <button
                      className="remove-button tooltip"
                      onClick={() => removeItem(index)}
                      data-tooltip="Supprimer cet article"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addItem}
          className="add-item-button tooltip"
          data-tooltip="Ajouter un article"
        >
          Ajouter un article
        </button>
        {errors.items && <div className="error-message" style={{ marginLeft: '40px' }}>{errors.items}</div>}

        <div className="totals-bank-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="payment-info" style={{ width: '60%', minWidth: '200px' }}>
            <h2>{editInvoice.documentType === 'facture' ? 'RÈGLEMENT :' : 'INFORMATIONS :'}</h2>
            {editInvoice.documentType === 'facture' ? (
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
            <p><strong>TOTAL HT :</strong> {calculateTotalHT()} TND</p>
            <p>
              <strong>TVA :</strong>
              <input
                type="number"
                name="taxRate"
                value={editInvoice.taxRate}
                onChange={handleInputChange}
                min="0"
                step="0.1"
                style={{ width: '60px', marginRight: '5px' }}
              />
              % : {calculateTVA()} TND
            </p>
            <p><strong>TIMBRE :</strong> <input type="number" name="timbre" value={editInvoice.timbre} readOnly className="timbre-input" /> TND</p>
            <p><strong>TOTAL TTC :</strong> {calculateTotalTTC()} TND</p>
            <p className="amount-in-words">
              Arrêtée la présente à la somme de : {formatAmountInWords(calculateTotalTTC())} TND
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
  );
};

export default EditInvoice;

