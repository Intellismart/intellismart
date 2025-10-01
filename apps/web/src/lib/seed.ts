import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';
import { Product } from '@/models/Product';
import { hashPassword } from '@/lib/auth-utils';

async function seedDatabase() {
  try {
    await dbConnect();

    // Create admin user
    const adminEmail = 'admin@intellismart.au';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword('admin123');
      const adminUser = new User({
        email: adminEmail,
        name: 'IntelliSMART Admin',
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
      });
      await adminUser.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
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
        attributes: {
          'response-time': 'Under 1 second',
          'languages': ['English', 'Spanish', 'French'],
          'integrations': ['Slack', 'Teams', 'Email'],
        },
        subscriptionEligible: true,
        stockTracking: true,
        stockLevel: 100,
        reorderPoint: 10,
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
        attributes: {
          'devices-supported': 'Up to 50',
          'automation-rules': 'Unlimited',
          'energy-monitoring': true,
        },
        subscriptionEligible: false,
        stockTracking: true,
        stockLevel: 25,
        reorderPoint: 5,
        status: 'active',
      },
      {
        sku: 'ISM003',
        name: 'Security Monitoring Suite',
        description: 'Comprehensive security monitoring with threat detection and automated response.',
        category: 'Security',
        price: 79,
        currency: 'USD',
        images: ['🔒'],
        attributes: {
          'threat-detection': 'AI-powered',
          'response-time': 'Real-time',
          'coverage': 'Network, Application, Data',
        },
        subscriptionEligible: true,
        stockTracking: true,
        stockLevel: 50,
        reorderPoint: 10,
        status: 'active',
      },
      {
        sku: 'ISM004',
        name: 'Cloud Migration Assistant',
        description: 'Automated cloud migration tool with minimal downtime and data integrity guarantees.',
        category: 'Cloud Services',
        price: 199,
        currency: 'USD',
        images: ['☁️'],
        attributes: {
          'migration-speed': 'Up to 10TB/hour',
          'downtime': 'Less than 1 hour',
          'compatibility': 'AWS, Azure, GCP',
        },
        subscriptionEligible: false,
        stockTracking: true,
        stockLevel: 15,
        reorderPoint: 3,
        status: 'active',
      },
      {
        sku: 'ISM005',
        name: 'Data Analytics Platform',
        description: 'Advanced data analytics and business intelligence platform with AI-powered insights.',
        category: 'AI Agents',
        price: 149,
        currency: 'USD',
        images: ['📊'],
        attributes: {
          'data-sources': 'Unlimited',
          'reports': 'Custom dashboards',
          'predictions': 'Machine learning',
        },
        subscriptionEligible: true,
        stockTracking: true,
        stockLevel: 30,
        reorderPoint: 5,
        status: 'active',
      },
    ];

    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ sku: productData.sku });

      if (!existingProduct) {
        const product = new Product({
          ...productData,
          createdBy: (await User.findOne({ role: 'admin' }))?._id,
        });
        await product.save();
        console.log(`Product created: ${productData.name}`);
      } else {
        console.log(`Product already exists: ${productData.name}`);
      }
    }

    console.log('Database seeding completed');

  } catch (error) {
    console.error('Database seeding error:', error);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
