# 🧾 Système de Facturation

Un système complet de gestion de factures et devis avec React frontend et Node.js backend connecté à MongoDB Atlas.

## 🚀 Fonctionnalités

- ✅ **Création de factures et devis** avec interface moderne
- ✅ **Stockage persistant** dans MongoDB Atlas
- ✅ **API REST complète** avec Node.js et Express
- ✅ **Interface React** responsive et intuitive
- ✅ **Calculs automatiques** (TVA, totaux, etc.)
- ✅ **Export PDF** des documents
- ✅ **Historique complet** des documents
- ✅ **Modification et suppression** des documents

## 🛠️ Technologies

### Frontend
- **React** - Interface utilisateur
- **Vite** - Build tool
- **CSS3** - Styling moderne
- **jsPDF** - Génération de PDF

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Mongoose** - ODM MongoDB
- **CORS** - Cross-origin resource sharing

### Base de données
- **MongoDB Atlas** - Base de données cloud

## 📁 Structure du projet

```
pfa/
├── facturation/          # Frontend React
│   ├── src/
│   │   ├── App.jsx
│   │   ├── InvoiceForm.jsx
│   │   ├── InvoiceHistory.jsx
│   │   ├── api.js
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.js
├── backend/              # Backend Node.js
│   ├── server.js
│   ├── package.json
│   ├── test-api.js
│   └── integration-guide.md
└── README.md
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- Compte MongoDB Atlas

### 1. Cloner le repository
```bash
git clone https://github.com/hwidifiras/facturation.git
cd facturation
```

### 2. Configuration du backend
```bash
cd backend
npm install
```

Créer un fichier `.env` avec vos credentials MongoDB Atlas :
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/facture?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3. Configuration du frontend
```bash
cd ../facturation
npm install
```

### 4. Démarrer les serveurs

**Terminal 1 - Backend :**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend :**
```bash
cd facturation
npm run dev
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000/api`

- `GET /test` - Test de connexion MongoDB
- `GET /invoices` - Récupérer toutes les factures/devis
- `GET /invoices/:id` - Récupérer une facture spécifique
- `POST /invoices` - Créer une nouvelle facture/devis
- `PUT /invoices/:id` - Modifier une facture/devis
- `DELETE /invoices/:id` - Supprimer une facture/devis

## 📊 Structure des données

```javascript
{
  id: "id_unique",
  invoice_number: "0022025",
  date: "2025-01-21",
  client_name: "Nom du client",
  client_address: "Adresse",
  client_email: "email@client.com",
  client_mf: "Matricule fiscal",
  items: [{
    description: "Service",
    unitPrice: 100.00,
    manDays: 1,
    total: 100.00
  }],
  timbre: 1.000,
  tax_rate: 19,
  total_ht: 100.00,
  tva: 19.00,
  total_ttc: 120.00,
  document_type: "facture", // ou "devis"
  created_at: "2025-01-21T10:30:00.000Z",
  updated_at: "2025-01-21T10:30:00.000Z"
}
```

## 🎯 Utilisation

1. **Créer une facture/devis :**
   - Remplissez les informations client
   - Ajoutez les articles/services
   - Les calculs se font automatiquement
   - Cliquez sur "Enregistrer"

2. **Consulter l'historique :**
   - Cliquez sur "Historique"
   - Visualisez tous vos documents
   - Modifiez ou supprimez selon besoin

3. **Exporter en PDF :**
   - Ouvrez un document
   - Cliquez sur "Enregistrer en PDF"

## 🔧 Configuration MongoDB Atlas

1. Créez un cluster MongoDB Atlas
2. Créez un utilisateur de base de données
3. Obtenez votre connection string
4. Ajoutez-le dans le fichier `.env`

## 📝 Variables d'environnement

```env
# Backend (.env)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/facture?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Hwidifiras** - [GitHub](https://github.com/hwidifiras)

## 🙏 Remerciements

- MongoDB Atlas pour l'hébergement de base de données
- React et Node.js communities
- Tous les contributeurs open source

---

⭐ Si ce projet vous a aidé, n'hésitez pas à le star sur GitHub !
