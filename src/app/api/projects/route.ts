import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { Project } from '@/lib/types';

const mockProjects: Project[] = [
  { id: '1', name: 'Homepage Development', description: 'Main website development' },
  { id: '2', name: 'Mobile App', description: 'iOS and Android app' },
  { id: '3', name: 'API Development', description: 'Backend API services' },
  { id: '4', name: 'Database Design', description: 'Database architecture' },
];

function getAuthToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth-token')?.value;
  
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return cookieToken || null;
}

export async function GET(request: NextRequest) {
  const token = getAuthToken(request);
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = getUserFromToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return NextResponse.json(mockProjects);
}