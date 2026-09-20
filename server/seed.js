require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create Admin User
    const admin = await User.create({
      username: 'Admin',
      email: 'admin@supershop.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create Regular User
    const user = await User.create({
      username: 'John Doe',
      email: 'user@supershop.com',
      password: 'user123',
      role: 'user'
    });

    // Create Sample Products
    const products = [
      {
        name: 'ProMax X15 Smartphone',
        description: 'Latest flagship smartphone with advanced features',
        price: 549.99,
        stock: 45,
        category: 'Electronics',
        imageUrl: 'https://via.placeholder.com/300',
        ratings: 4.5,
        numReviews: 1230
      },
      {
        name: 'UltraBook Pro 16"',
        description: 'High-performance laptop for professionals',
        price: 1299.00,
        stock: 12,
        category: 'Electronics',
        imageUrl: 'https://via.placeholder.com/300',
        ratings: 5.0,
        numReviews: 856
      },
      {
        name: 'SoundPro Wireless Headphones',
        description: 'Premium noise-cancelling headphones',
        price: 139.99,
        stock: 234,
        category: 'Electronics',
        imageUrl: 'https://via.placeholder.com/300',
        ratings: 4.0,
        numReviews: 432
      },
      {
        name: 'SmartWatch Series 9',
        description: 'Advanced fitness and health tracking smartwatch',
        price: 299.00,
        stock: 89,
        category: 'Electronics',
        imageUrl: 'https://via.placeholder.com/300',
        ratings: 4.7,
        numReviews: 2100
      },
      {
        name: 'Air Comfort Sneakers',
        description: 'Comfortable running shoes for daily wear',
        price: 89.99,
        stock: 156,
        category: 'Fashion',
        imageUrl: 'https://via.placeholder.com/300',
        ratings: 4.6,
        numReviews: 378
      },
      {
        name: 'Premium Espresso Machine',
        description: 'Professional-grade coffee maker for home',
        price: 349.00,
        stock: 34,
        category: 'Home & Garden',
        imageUrl: 'https://via.placeholder.com/300',
        ratings: 5.0,
        numReviews: 93
      }
    ];

    await Product.insertMany(products);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Admin Login:');
    console.log('   Email: admin@supershop.com');
    console.log('   Password: admin123');
    console.log('\n📧 User Login:');
    console.log('   Email: user@supershop.com');
    console.log('   Password: user123');
    console.log('\n✨ Created 6 sample products\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
