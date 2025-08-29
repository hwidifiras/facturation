// Test script to check existing MongoDB database
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/facture';

async function testExistingDatabase() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to your existing MongoDB database...');
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
    
    // Check the 'fac' collection
    const facCollection = db.collection('fac');
    const count = await facCollection.countDocuments();
    console.log(`\n📋 Collection 'fac' has ${count} documents`);
    
    if (count > 0) {
      console.log('\n📄 Sample documents in 'fac' collection:');
      const sampleDocs = await facCollection.find().limit(3).toArray();
      sampleDocs.forEach((doc, index) => {
        console.log(`\nDocument ${index + 1}:`);
        console.log(`  - Invoice Number: ${doc.invoice_number || 'N/A'}`);
        console.log(`  - Client: ${doc.client_name || 'N/A'}`);
        console.log(`  - Total: ${doc.total_ttc || 'N/A'} TND`);
        console.log(`  - Type: ${doc.document_type || 'N/A'}`);
      });
    }
    
    console.log('\n🎉 Database test completed!');
    console.log('\n📋 Your setup:');
    console.log('- Database: facture');
    console.log('- Collection: fac');
    console.log('- Connection: mongodb://localhost:27017/facture');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. MongoDB is running on localhost:27017');
    console.log('2. Database "facture" exists');
    console.log('3. Collection "fac" exists');
  } finally {
    await client.close();
  }
}

testExistingDatabase();



