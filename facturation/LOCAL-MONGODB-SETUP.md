# 🗄️ Local MongoDB Setup Guide

## 🎯 What You Have
- ✅ Local MongoDB database named "facture"
- ✅ Collection named "facture" 
- ✅ Application configured to connect to local MongoDB

## 🚀 Step 1: Start MongoDB (if not running)

Make sure your MongoDB server is running on localhost:27017

### Windows:
```bash
# If MongoDB is installed as a service, it should be running
# If not, start it manually:
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### macOS/Linux:
```bash
# Start MongoDB service
sudo systemctl start mongod
# or
brew services start mongodb-community
```

## 🚀 Step 2: Start Netlify Development Server

```bash
npm run netlify:dev
```

This will start:
- React app on: `http://localhost:8888`
- Netlify Functions on: `http://localhost:8888/.netlify/functions`

## 🧪 Step 3: Test Your Setup

### Option A: Use the MongoDB Test Page
1. Visit: `http://localhost:8888/test-mongodb.html`
2. Click "Test MongoDB Connection" - should connect to your database
3. Click "Create Test Invoice" - should save to MongoDB
4. Click "View All Invoices" - should show invoices from MongoDB
5. Click "Test Update" - should update an invoice

### Option B: Test the Main Application
1. Visit: `http://localhost:8888`
2. Go to "Nouvelle Facture" tab
3. Fill out an invoice form
4. Click "Enregistrer" - should save to MongoDB
5. Go to "Historique" tab - should show your invoice from MongoDB

## ✅ What Should Work

### Database Connection
- ✅ Connects to localhost:27017
- ✅ Uses database "facture"
- ✅ Uses collection "facture"
- ✅ No connection errors

### Invoice Operations
- ✅ Create invoices (saves to MongoDB)
- ✅ View invoices (loads from MongoDB)
- ✅ Edit invoices (updates in MongoDB)
- ✅ Delete invoices (removes from MongoDB)

### Data Persistence
- ✅ Invoices survive application restart
- ✅ Invoices survive MongoDB restart
- ✅ Data stored in MongoDB, not localStorage

## 🔍 How to Verify Data in MongoDB

### Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `facture`
4. Select collection: `facture`
5. View your invoices

### Using MongoDB Shell:
```bash
# Connect to MongoDB
mongosh

# Switch to facture database
use facture

# View all invoices
db.facture.find()

# Count invoices
db.facture.countDocuments()

# View specific invoice
db.facture.findOne({invoice_number: "FACT001"})
```

## 🚨 Troubleshooting

### If connection fails:
1. **Check MongoDB is running:**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl status mongod
   ```

2. **Check connection string:**
   - Should be: `mongodb://localhost:27017/facture`
   - Port should be 27017

3. **Check database exists:**
   ```bash
   mongosh
   show dbs
   # Should see "facture" in the list
   ```

### If Netlify Functions fail:
1. **Check Netlify dev server:**
   ```bash
   npm run netlify:dev
   ```
   Should show: "Server now ready on http://localhost:8888"

2. **Check environment variables:**
   - MONGODB_URI should be set to local connection

### If invoices don't save:
1. Check browser console (F12) for errors
2. Check Netlify function logs
3. Verify MongoDB connection

## 🎉 Success Indicators

Your local MongoDB setup is working when:
- ✅ MongoDB connection test passes
- ✅ Can create invoices in MongoDB
- ✅ Can view invoices from MongoDB
- ✅ Can edit invoices in MongoDB
- ✅ Data persists in MongoDB
- ✅ No errors in console or logs

## 🔄 Next Steps

Once local MongoDB testing works perfectly:
1. Set up MongoDB Atlas (online)
2. Deploy to Netlify
3. Switch connection string to Atlas
4. Test online deployment

## 📊 Testing Checklist

- [ ] MongoDB server running on localhost:27017
- [ ] Netlify dev server running on localhost:8888
- [ ] MongoDB connection test passes
- [ ] Can create invoices in MongoDB
- [ ] Can view invoices from MongoDB
- [ ] Can edit invoices in MongoDB
- [ ] Data persists in MongoDB
- [ ] No console errors

**If all tests pass, your application is ready for online deployment!** 🚀



