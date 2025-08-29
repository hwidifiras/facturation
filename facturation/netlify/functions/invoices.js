import { connectToDatabase, closeConnection } from './mongoClient.js';

export async function handler(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Cache-Control': 'no-cache'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  let db;
  try {
    db = await connectToDatabase();
    // Choose collection based on document type
    const documentType = event.body ? JSON.parse(event.body).document_type : null;
    const collectionName = documentType === 'devis' ? 'dev' : 'fac';
    const collection = db.collection(collectionName);

    switch (event.httpMethod) {
      case 'GET':
        return await handleGet(event, collection, headers);
      case 'POST':
        return await handlePost(event, collection, headers);
      case 'PUT':
        return await handlePut(event, collection, headers);
      case 'DELETE':
        return await handleDelete(event, collection, headers);
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    console.error('Request details:', {
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      headers: event.headers
    });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  } finally {
    if (db) {
      await closeConnection();
    }
  }
}

async function handleGet(event, collection, headers) {
  try {
    const { id } = event.queryStringParameters || {};
    
    if (id) {
      // Get single invoice - search in both collections
      const db = collection.db;
      const facCollection = db.collection('fac');
      const devCollection = db.collection('dev');
      
      let invoice = await facCollection.findOne({ id });
      if (!invoice) {
        invoice = await devCollection.findOne({ id });
      }
      
      if (!invoice) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Invoice not found' })
        };
      }
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(invoice)
      };
    } else {
      // Get all invoices from both collections
      const db = collection.db;
      const facCollection = db.collection('fac');
      const devCollection = db.collection('dev');
      
      const [factures, devis] = await Promise.all([
        facCollection.find({}).sort({ created_at: -1 }).toArray(),
        devCollection.find({}).sort({ created_at: -1 }).toArray()
      ]);
      
      // Combine and sort all documents
      const allDocuments = [...factures, ...devis].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(allDocuments)
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching invoices' })
    };
  }
}

async function handlePost(event, collection, headers) {
  try {
    const invoice = JSON.parse(event.body);
    
    // Validate required fields
    if (!invoice.invoice_number || !invoice.client_name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Add timestamp if not present
    if (!invoice.created_at) {
      invoice.created_at = new Date().toISOString();
    }

    const result = await collection.insertOne(invoice);
    
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ 
        message: 'Invoice created successfully',
        id: result.insertedId 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error creating invoice' })
    };
  }
}

async function handlePut(event, collection, headers) {
  try {
    const { id } = event.queryStringParameters || {};
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invoice ID required' })
      };
    }

    const updates = JSON.parse(event.body);
    
    // Try to update in both collections
    const db = collection.db;
    const facCollection = db.collection('fac');
    const devCollection = db.collection('dev');
    
    let result = await facCollection.updateOne(
      { id },
      { $set: { ...updates, updated_at: new Date().toISOString() } }
    );
    
    if (result.matchedCount === 0) {
      result = await devCollection.updateOne(
        { id },
        { $set: { ...updates, updated_at: new Date().toISOString() } }
      );
    }

    if (result.matchedCount === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Invoice not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Invoice updated successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error updating invoice' })
    };
  }
}

async function handleDelete(event, collection, headers) {
  try {
    const { id } = event.queryStringParameters || {};
    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invoice ID required' })
      };
    }

    // Try to delete from both collections
    const db = collection.db;
    const facCollection = db.collection('fac');
    const devCollection = db.collection('dev');
    
    let result = await facCollection.deleteOne({ id });
    if (result.deletedCount === 0) {
      result = await devCollection.deleteOne({ id });
    }
    
    if (result.deletedCount === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Invoice not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Invoice deleted successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error deleting invoice' })
    };
  }
}
