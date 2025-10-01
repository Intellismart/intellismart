import 'dotenv/config';
import dbConnect from '../src/lib/db';
import { User } from '../src/models/User';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@intellismart.au';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seedAdmin() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', {
        id: existingAdmin._id,
        email: existingAdmin.email,
        role: existingAdmin.role,
      });
      process.exit(0);
    }

    console.log('Creating admin user...');
    
    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Create admin user
    const adminUser = new User({
      email: ADMIN_EMAIL,
      name: 'IntelliSMART Admin',
      password: hashedPassword,
      role: 'admin',
      company: 'IntelliSMART',
      isEmailVerified: true,
      mfaEnabled: false,
    });

    await adminUser.save();

    console.log('Admin user created successfully:', {
      id: adminUser._id,
      email: adminUser.email,
      role: adminUser.role,
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
