import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import { User } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT token
function generateToken(user: any): string {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

export async function POST(request: NextRequest) {
  try {
    console.log('Mock registration attempt received');

    const { email, password, name, company, role = 'customer' } = await request.json();
    console.log('Registration data:', { email, name, company, role });

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      company,
      role: role || 'customer',
      isEmailVerified: false,
      mfaEnabled: false,
    });

    await newUser.save();
    console.log('User created successfully:', newUser.email);

    // Generate token
    const token = generateToken(newUser);

    // Return user data (excluding password)
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      company: newUser.company,
      isEmailVerified: newUser.isEmailVerified,
    };

    return NextResponse.json({
      user: userResponse,
      token,
      message: 'Registration successful',
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
