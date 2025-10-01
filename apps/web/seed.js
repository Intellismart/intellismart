const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/intellismart');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'manager'], default: 'customer' },
  company: String,
  isEmailVerified: { type: Boolean, default: false },
  mfaEnabled: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  images: [String],
  attributes: { type: Map, of: mongoose.Schema.Types.Mixed },
  subscriptionEligible: { type: Boolean, default: false },
  stockTracking: { type: Boolean, default: true },
  stockLevel: { type: Number, default: 0, min: 0 },
  reservedStock: { type: Number, default: 0, min: 0 },
  reorderPoint: { type: Number, default: 10, min: 0 },
  status: { type: String, enum: ['active', 'inactive', 'draft'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Seed data
async function seedDatabase() {
  try {
    await connectDB();

    // Create admin user
    const adminEmail = 'admin@intellismart.au';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const adminUser = new User({
        email: adminEmail,
        name: 'IntelliSMART Admin',
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
      });
      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Create sample products
    const sampleProducts = [
      {
        sku: 'ISM001',
        name: 'Customer Service AI Agent',
        description: 'Intelligent customer service automation with natural language processing and 24/7 availability.',
        category: 'AI Agents',
        price: 49,
        currency: 'USD',
        images: ['🤖'],
        subscriptionEligible: true,
        stockLevel: 100,
        status: 'active',
      },
      {
        sku: 'ISM002',
        name: 'Smart Office Hub',
        description: 'Centralized office management system with IoT device control and automation.',
        category: 'Smart Office',
        price: 299,
        currency: 'USD',
        images: ['🏢'],
        subscriptionEligible: false,
        stockLevel: 25,
        status: 'active',
      },
    ];

    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ sku: productData.sku });

      if (!existingProduct) {
        const adminUser = await User.findOne({ role: 'admin' });
        const product = new Product({
          ...productData,
          createdBy: adminUser._id,
        });
        await product.save();
        console.log(`✅ Product created: ${productData.name}`);
      } else {
        console.log(`✅ Product already exists: ${productData.name}`);
      }
    }

    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run seeding
seedDatabase();
