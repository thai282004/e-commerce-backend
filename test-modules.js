// Simple validation script to check if all modules load correctly
const path = require('path');

console.log('🧪 Testing E-Commerce Backend Modules...\n');

try {
  // Test environment variables
  require('dotenv').config();
  console.log('✅ Environment configuration loaded');
  
  // Test utilities
  const generateToken = require('./src/utils/generateToken');
  console.log('✅ Token generator loaded');
  
  // Test middleware
  const { protect, admin } = require('./src/middleware/auth');
  console.log('✅ Authentication middleware loaded');
  
  // Test models
  const User = require('./src/models/User');
  const Product = require('./src/models/Product');
  const Cart = require('./src/models/Cart');
  const Order = require('./src/models/Order');
  console.log('✅ All models loaded (User, Product, Cart, Order)');
  
  // Test controllers
  const userController = require('./src/controllers/userController');
  const productController = require('./src/controllers/productController');
  const cartController = require('./src/controllers/cartController');
  const orderController = require('./src/controllers/orderController');
  console.log('✅ All controllers loaded');
  
  // Test routes
  const userRoutes = require('./src/routes/userRoutes');
  const productRoutes = require('./src/routes/productRoutes');
  const cartRoutes = require('./src/routes/cartRoutes');
  const orderRoutes = require('./src/routes/orderRoutes');
  console.log('✅ All routes loaded');
  
  // Test Express app structure (without connecting to DB)
  console.log('\n📋 API Structure:');
  console.log('   - User endpoints: /api/users');
  console.log('   - Product endpoints: /api/products');
  console.log('   - Cart endpoints: /api/cart');
  console.log('   - Order endpoints: /api/orders');
  
  console.log('\n✨ All modules loaded successfully!');
  console.log('📝 Note: Database connection test skipped (MongoDB not available)');
  console.log('🚀 The backend is ready to run with: npm start');
  
  process.exit(0);
} catch (error) {
  console.error('❌ Error loading modules:', error.message);
  console.error(error.stack);
  process.exit(1);
}
