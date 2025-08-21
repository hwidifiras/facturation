# Backend API Server

A secure Node.js backend with Express and Mongoose that connects to MongoDB Atlas.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
1. Copy `env.example` to `.env`
2. Add your MongoDB Atlas connection string to `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3. Run the Server
```bash
# Production
npm start

# Development (with auto-restart)
npm run dev
```

## 📡 API Endpoints

### Test Connection
- **GET** `/api/test` - Test MongoDB connection

### Users CRUD
- **POST** `/api/users` - Create a new user
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get one user
- **PUT** `/api/users/:id` - Update a user
- **DELETE** `/api/users/:id` - Delete a user

## 📝 User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  age: Number (required, 0-150),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔧 Features
- ✅ MongoDB Atlas connection with Mongoose
- ✅ CORS enabled for frontend integration
- ✅ Input validation and error handling
- ✅ Environment variable configuration
- ✅ RESTful API design
- ✅ Auto-generated timestamps

## 🛠️ Technologies
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- CORS
- dotenv
