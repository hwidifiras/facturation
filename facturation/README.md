# Invoice Management System

A full-stack invoice and quote management application built with React, Node.js, and MongoDB.

## 🚀 Quick Deployment on Netlify

### Prerequisites
- GitHub account
- MongoDB Atlas account (already configured)

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Configure Environment Variables**
   - In Netlify dashboard, go to Site settings → Environment variables
   - Add: `MONGODB_URI` = `mongodb+srv://haouidifiras:imXUjDSuyVtr4hxa@facturation.4sqartn.mongodb.net/facture?retryWrites=true&w=majority`

4. **Your site will be live at**: `https://your-site-name.netlify.app`

### Alternative: Vercel Deployment
```bash
npm install -g vercel
vercel
```

## 🛠️ Local Development

### Frontend
```bash
cd facturation
npm install
npm run dev
```

### Backend (Optional for local development)
```bash
cd backend
npm install
npm run dev
```

## 📁 Project Structure

- `facturation/` - React frontend with Vite
- `backend/` - Node.js/Express API server
- `netlify/functions/` - Serverless functions for production

## 🔧 Features

- Create invoices and quotes
- PDF generation
- Search and filter history
- Edit existing documents
- Responsive design
- MongoDB Atlas integration

## 🌐 Live Demo

Your application will be available at the Netlify URL after deployment.
