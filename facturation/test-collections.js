// Test script to check and test both fac and dev collections
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/facture';

async function testCollections() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to your MongoDB database...');
    await client.connect();
    console.log('✅ Connected to MongoDB!');
    
    const db = client.db('facture');
    console.log('📊 Database: facture');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections found:');
    collections.forEach(col => {
      console.log(`  - ${col.name}`);
    });
    
    // Check both collections
    const facCollection = db.collection('fac');
    const devCollection = db.collection('dev');
    
    const facCount = await facCollection.countDocuments();
    const devCount = await devCollection.countDocuments();
    
    console.log(`\n📋 Collection 'fac' has ${facCount} documents`);
    console.log(`📋 Collection 'dev' has ${devCount} documents`);
    
    // Test creating documents in both collections
    console.log('\n🧪 Testing document creation...');
    
    // Test facture
    const testFacture = {
      id: 'TEST-FAC-001',
      invoice_number: 'FAC-2024-001',
      client_name: 'Test Client Facture',
      total_ttc: 1500.00,
      document_type: 'facture',
      created_at: new Date().toISOString()
    };
    
    // Test devis
    const testDevis = {
      id: 'TEST-DEV-001',
      invoice_number: 'DEV-2024-001',
      client_name: 'Test Client Devis',
      total_ttc: 800.00,
      document_type: 'devis',
      created_at: new Date().toISOString()
    };
    
    // Insert test documents
    await facCollection.insertOne(testFacture);
    await devCollection.insertOne(testDevis);
    
    console.log('✅ Test documents created successfully!');
    
    // Show updated counts
    const newFacCount = await facCollection.countDocuments();
    const newDevCount = await devCollection.countDocuments();
    
    console.log(`\n📊 Updated counts:`);
    console.log(`  - Collection 'fac': ${newFacCount} documents`);
    console.log(`  - Collection 'dev': ${newDevCount} documents`);
    
    // Show sample documents
    if (newFacCount > 0) {
      console.log('\n📄 Sample facture:');
      const sampleFac = await facCollection.findOne({});
      console.log(`  - Invoice Number: ${sampleFac.invoice_number}`);
      console.log(`  - Client: ${sampleFac.client_name}`);
      console.log(`  - Total: ${sampleFac.total_ttc} TND`);
      console.log(`  - Type: ${sampleFac.document_type}`);
    }
    
    if (newDevCount > 0) {
      console.log('\n📄 Sample devis:');
      const sampleDev = await devCollection.findOne({});
      console.log(`  - Invoice Number: ${sampleDev.invoice_number}`);
      console.log(`  - Client: ${sampleDev.client_name}`);
      console.log(`  - Total: ${sampleDev.total_ttc} TND`);
      console.log(`  - Type: ${sampleDev.document_type}`);
    }
    
    console.log('\n🎉 Database test completed!');
    console.log('\n📋 Your setup:');
    console.log('- Database: facture');
    console.log('- Collection fac: for factures');
    console.log('- Collection dev: for devis');
    console.log('- Connection: mongodb://localhost:27017/facture');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. MongoDB is running on localhost:27017');
    console.log('2. Database "facture" exists');
    console.log('3. Collections "fac" and "dev" exist');
  } finally {
    await client.close();
  }
}

testCollections();



