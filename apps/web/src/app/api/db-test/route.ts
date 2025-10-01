import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test database connection
    const mongoose = require('mongoose');
    await mongoose.connect('mongodb://localhost:27017/intellismart');

    // Test if we can query users
    const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
      email: String,
      name: String,
      password: String,
      role: String,
    }));

    const users = await User.find({}).limit(1);
    console.log('Found users:', users.length);

    return NextResponse.json({
      message: 'Database test successful',
      userCount: users.length,
      connection: 'connected',
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      error: 'Database connection failed',
      message: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
