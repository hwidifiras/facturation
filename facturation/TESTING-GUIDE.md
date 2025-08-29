# 🧪 Testing Guide - Local Development

## 🎯 What to Test

Before setting up MongoDB online, test that your invoice system works perfectly locally with localStorage.

## 🚀 Step 1: Start Local Development

```bash
npm run dev
```

This will start your application at `http://localhost:5173`

## 🧪 Step 2: Test localStorage Functionality

### Option A: Use the Test Page
1. Visit: `http://localhost:5173/test-local.html`
2. Click "Create Test Invoice" - should create a test invoice
3. Click "View All Invoices" - should show your test invoice
4. Click "View Raw Storage" - should show JSON data

### Option B: Test the Main Application
1. Visit: `http://localhost:5173`
2. Go to "Nouvelle Facture" tab
3. Fill out an invoice form
4. Click "Enregistrer" - should save to localStorage
5. Go to "Historique" tab - should show your invoice
6. Try editing the invoice
7. Try exporting to PDF

## ✅ What Should Work

### Invoice Creation
- ✅ Fill out invoice form
- ✅ Save invoice (stores in localStorage)
- ✅ Success message appears
- ✅ Form resets after saving

### Invoice History
- ✅ View all saved invoices
- ✅ Search and filter invoices
- ✅ Sort by different columns
- ✅ Edit existing invoices
- ✅ Changes save back to localStorage

### PDF Export
- ✅ Export invoice to PDF
- ✅ PDF contains all invoice data
- ✅ Professional formatting

### Data Persistence
- ✅ Invoices survive page refresh
- ✅ Invoices survive browser restart
- ✅ Data stored in browser localStorage

## 🔍 How to Check localStorage

### In Browser Developer Tools:
1. Press F12 to open developer tools
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Click "Local Storage" → `http://localhost:5173`
4. Look for `invoices` key
5. Click on it to see the JSON data

### Expected localStorage Data:
```json
{
  "invoices": [
    {
      "id": "test_1234567890",
      "invoice_number": "FACT001",
      "client_name": "Test Client",
      "total_ttc": 120,
      "created_at": "2024-01-01T00:00:00.000Z",
      // ... other invoice data
    }
  ]
}
```

## 🚨 Troubleshooting

### If invoices don't save:
1. Check browser console for errors (F12)
2. Make sure all form fields are filled
3. Check if localStorage is enabled in browser

### If invoices don't appear in history:
1. Refresh the page
2. Check if localStorage has data
3. Look for JavaScript errors in console

### If PDF export doesn't work:
1. Check if jsPDF library is loaded
2. Make sure invoice data is complete
3. Try different browsers

## 🎉 Success Indicators

Your local testing is successful when:
- ✅ Can create invoices and they save
- ✅ Can view invoices in history
- ✅ Can edit invoices and changes save
- ✅ Can export PDFs
- ✅ Data persists after page refresh
- ✅ No errors in browser console

## 🔄 Next Steps

Once local testing works perfectly:
1. Set up MongoDB Atlas (free)
2. Deploy to Netlify
3. Switch from localStorage to MongoDB
4. Test online deployment

## 📊 Testing Checklist

- [ ] Start development server
- [ ] Create test invoice via test page
- [ ] Create invoice via main application
- [ ] View invoices in history
- [ ] Edit an existing invoice
- [ ] Export invoice to PDF
- [ ] Verify data persists after refresh
- [ ] Check localStorage in developer tools
- [ ] No console errors

**If all tests pass, your application is ready for online deployment!** 🚀

