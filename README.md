# Swan Botanicals - E-Commerce Platform

A modern e-commerce platform built with React, TypeScript, Node.js, and MongoDB for Swan Botanicals hair care products.

## ✨ Features

### Frontend
- **Modern UI/UX**: Built with React 18, TypeScript, and Tailwind CSS
- **Authentication**: User registration, login, and logout with JWT
- **Shopping Cart**: Add products, manage quantities, and checkout
- **Personalized Experience**: Greeting for logged-in users on homepage
- **Responsive Design**: Optimized for desktop and mobile devices
- **Product Showcase**: Interactive product carousels with image galleries

### Backend  
- **RESTful API**: Express.js server with MongoDB integration
- **User Management**: Secure authentication with bcrypt and JWT
- **Order Processing**: Complete checkout system with order tracking
- **Data Validation**: Input validation using Joi
- **Security**: Helmet for security headers, rate limiting, and CORS
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS + shadcn/ui
- React Router DOM
- TanStack Query
- Lucide React (Icons)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password hashing)
- Joi (Validation)
- Helmet (Security)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Git

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/swan-botanicals
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:8080
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # macOS (using Homebrew)
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to project root**
   ```bash
   cd .. # (if you were in the server directory)
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:8080`

## 💡 Usage

### User Registration & Authentication
1. Visit the website
2. Click "Sign Up" to create an account
3. Fill in your details (name, email, password, optional phone)
4. Login with your credentials
5. Enjoy personalized experience with greeting on homepage

### Shopping & Checkout
1. Browse products in the showcase
2. Add items to cart using "Add to cart" buttons
3. View cart by clicking the cart icon in header
4. Proceed to checkout with complete shipping form
5. Choose payment method (Razorpay or Cash on Delivery)
6. Complete order and receive confirmation with order ID

### Features Overview
- **Product Layout**: Conditioner and Hair Oil sections are displayed side by side
- **Authentication**: Real MongoDB backend with secure JWT authentication
- **Checkout**: Complete order processing with MongoDB storage
- **Responsive**: Works seamlessly on mobile and desktop
- **Personalization**: Shows user greeting when logged in

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/verify-token` - Verify JWT token

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:orderId` - Get single order
- `PUT /api/orders/:orderId/status` - Update order status (protected)

### Health Check
- `GET /api/health` - API health check

---

**Swan Botanicals** - Nature's Gentle Touch 🌿
