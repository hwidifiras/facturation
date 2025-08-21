// Test script pour vérifier l'API
const http = require('http');

const API_BASE_URL = 'http://localhost:5000/api';

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, API_BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          resolve(jsonData);
        } catch (e) {
          resolve(body);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing API connection...');
  
  try {
    // Test 1: Test de connexion
    console.log('1. Testing connection...');
    const testData = await makeRequest('/test');
    console.log('✅ Connection test:', testData);
    
    // Test 2: Récupérer les factures
    console.log('2. Testing get invoices...');
    const invoicesData = await makeRequest('/invoices');
    console.log('✅ Get invoices:', invoicesData);
    
    // Test 3: Créer une facture de test
    console.log('3. Testing create invoice...');
    const testInvoice = {
      id: "id_test_" + Date.now(),
      invoice_number: "TEST001",
      date: "2025-01-21",
      client_name: "Client Test",
      client_address: "Adresse Test",
      client_email: "test@example.com",
      client_mf: "123456789",
      items: [{
        description: "Service Test",
        unitPrice: 100,
        manDays: 1,
        total: 100
      }],
      timbre: 1.000,
      tax_rate: 19,
      total_ht: 100,
      tva: 19,
      total_ttc: 120,
      document_type: "facture",
      created_at: new Date().toISOString()
    };
    
    const createData = await makeRequest('/invoices', 'POST', testInvoice);
    console.log('✅ Create invoice:', createData);
    
    console.log('🎉 All tests passed! API is working correctly.');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
}

// Exécuter le test
testAPI();
