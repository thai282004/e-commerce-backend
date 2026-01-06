require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Product = require('./src/models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    phone: '555-0123'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'customer',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    phone: '555-0124'
  }
];

const sampleProducts = [
  {
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M2 Pro chip, 16GB RAM, 512GB SSD',
    price: 2499.99,
    category: 'electronics',
    stock: 15,
    brand: 'Apple',
    rating: 4.8,
    numReviews: 245,
    images: ['https://example.com/macbook1.jpg', 'https://example.com/macbook2.jpg']
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, 256GB storage',
    price: 1199.99,
    category: 'electronics',
    stock: 30,
    brand: 'Apple',
    rating: 4.9,
    numReviews: 512
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-cancelling wireless headphones',
    price: 399.99,
    category: 'electronics',
    stock: 50,
    brand: 'Sony',
    rating: 4.7,
    numReviews: 328
  },
  {
    name: 'Nike Air Max',
    description: 'Comfortable running shoes with excellent cushioning',
    price: 129.99,
    category: 'sports',
    stock: 100,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 189
  },
  {
    name: 'Levi\'s 501 Jeans',
    description: 'Classic straight fit jeans',
    price: 69.99,
    category: 'clothing',
    stock: 75,
    brand: 'Levi\'s',
    rating: 4.6,
    numReviews: 421
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 14.99,
    category: 'books',
    stock: 200,
    brand: 'Scribner',
    rating: 4.4,
    numReviews: 1205
  },
  {
    name: 'Coffee Maker',
    description: '12-cup programmable coffee maker with auto-shutoff',
    price: 49.99,
    category: 'home',
    stock: 40,
    brand: 'Mr. Coffee',
    rating: 4.3,
    numReviews: 567
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip exercise mat, 6mm thick',
    price: 29.99,
    category: 'sports',
    stock: 120,
    brand: 'Gaiam',
    rating: 4.5,
    numReviews: 234
  },
  {
    name: 'LEGO Star Wars Set',
    description: 'Millennium Falcon building set, 1351 pieces',
    price: 159.99,
    category: 'toys',
    stock: 25,
    brand: 'LEGO',
    rating: 4.9,
    numReviews: 678
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 249.99,
    category: 'electronics',
    stock: 60,
    brand: 'Garmin',
    rating: 4.6,
    numReviews: 892
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert users
    console.log('👥 Creating users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ ${createdUsers.length} users created`);

    // Insert products
    console.log('📦 Creating products...');
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} products created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample Credentials:');
    console.log('   Admin: admin@example.com / admin123');
    console.log('   User 1: john@example.com / password123');
    console.log('   User 2: jane@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
