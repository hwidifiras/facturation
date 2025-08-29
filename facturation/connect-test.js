// Simple MongoDB connection test
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/facture';

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Testing MongoDB connection...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = client.db('facture');
    const collection = db.collection('facture');
    
    // Test a simple operation
    const count = await collection.countDocuments();
    console.log(`📊 Current invoice count in 'facture' collection: ${count}`);
    
    console.log('🎉 MongoDB connection test passed!');
    console.log('\n📋 Connection Details:');
    console.log('- Database: facture');
    console.log('- Collection: facture');
    console.log('- URI: mongodb://localhost:27017/facture');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure MongoDB is running on localhost:27017');
    console.log('2. Check if database "facture" exists');
    console.log('3. Verify MongoDB service is started');
  } finally {
    await client.close();
  }
}

testConnection();
