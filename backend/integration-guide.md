# 🔗 Guide d'intégration avec votre Frontend React

## 📝 Modifier votre fichier api.js

Remplacez le contenu de `facturation/src/api.js` par ceci :

```javascript
// API service connecting to your Node.js backend
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Get all invoices
  async getInvoices() {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },

  // Get single invoice
  async getInvoice(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoice');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching invoice:', error);
      throw error;
    }
  },

  // Create new invoice
  async createInvoice(invoiceData) {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create invoice');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  // Update invoice
  async updateInvoice(id, invoiceData) {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update invoice');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  },

  // Delete invoice
  async deleteInvoice(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete invoice');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  },
};
```

## 🚀 Comment démarrer

### 1. Démarrer le backend :
```bash
cd backend
npm start
```
Le serveur sera disponible sur `http://localhost:5000`

### 2. Démarrer le frontend :
```bash
cd facturation
npm run dev
# ou
npm start
```

### 3. Tester la connexion
Ouvrez votre navigateur et allez sur votre application React. Elle devrait maintenant se connecter à votre backend MongoDB Atlas !

## 📊 Structure des données

Vos factures et devis sont maintenant stockés dans MongoDB Atlas avec cette structure :

```javascript
{
  "id": "id_unique_généré",
  "invoice_number": "0022025",
  "date": "2025-01-18",
  "client_name": "Nom du client",
  "client_address": "Adresse du client",
  "client_email": "email@client.com",
  "client_mf": "Matricule fiscal",
  "items": [
    {
      "description": "Service",
      "unitPrice": 100.00,
      "manDays": 1,
      "total": 100.00
    }
  ],
  "timbre": 1.000,
  "tax_rate": 19,
  "total_ht": 100.00,
  "tva": 19.00,
  "total_ttc": 120.00,
  "document_type": "facture", // ou "devis"
  "created_at": "2025-01-18T10:30:00.000Z",
  "updated_at": "2025-01-18T10:30:00.000Z"
}
```

## 🔍 Endpoints disponibles

- `GET /api/test` - Test de connexion
- `GET /api/invoices` - Récupérer toutes les factures/devis
- `GET /api/invoices/:id` - Récupérer une facture spécifique
- `POST /api/invoices` - Créer une nouvelle facture/devis
- `PUT /api/invoices/:id` - Modifier une facture/devis
- `DELETE /api/invoices/:id` - Supprimer une facture/devis

## ✅ Avantages

- ✅ **Données persistantes** dans MongoDB Atlas
- ✅ **Sécurisé** avec authentification MongoDB
- ✅ **Rapide** avec un backend optimisé
- ✅ **Compatible** avec votre frontend existant
- ✅ **Évolutif** pour ajouter de nouvelles fonctionnalités
