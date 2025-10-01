import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@intellismart.au';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST() {
  try {
    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists', user: existingAdmin },
        { status: 200 }
      );
    }

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

    // Return user data (excluding password)
    const userResponse = {
      id: adminUser._id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      company: adminUser.company,
      isEmailVerified: adminUser.isEmailVerified,
    };

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: userResponse,
    });

  } catch (error) {
    console.error('Error seeding admin user:', error);
    return NextResponse.json(
      { error: 'Failed to seed admin user' },
      { status: 500 }
    );
  }
}
