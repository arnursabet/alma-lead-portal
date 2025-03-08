import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

// Secret key for JWT signing (in a real app, this would be an environment variable)
const JWT_SECRET = new TextEncoder().encode('your-secret-key');

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    password: 'password123',
  }
];


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user && user.password === password) {
      // Create JWT token
      const token = await new SignJWT({
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);
      
      const response = NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
      
      response.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict',
      });
      
      return response;
    } else {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch {
    console.error('Login error occurred');
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 