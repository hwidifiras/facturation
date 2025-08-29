import { MongoClient } from 'mongodb';

// Use local MongoDB URI for development
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/facture';

const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    // Use the 'facture' database and 'facture' collection
    return client.db('facture');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function closeConnection() {
  try {
    await client.close();
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}
