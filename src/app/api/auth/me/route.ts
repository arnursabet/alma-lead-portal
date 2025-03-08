import { NextRequest, NextResponse } from 'next/server';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('auth_token');
  
  if (!authToken) {
    // If no auth token, user is not authenticated
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const user: AuthUser = {
      id: 'admin-user-1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    };
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error validating authentication:', error);
    
    return NextResponse.json(
      { error: 'Invalid authentication' },
      { status: 401 }
    );
  }
}
