import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { Timesheet, TimesheetEntry } from '@/lib/types';

// Mock data
const mockTimesheets: Timesheet[] = [
  {
    id: '1',
    weekNumber: 1,
    dateRange: '1 - 5 January, 2024',
    status: 'COMPLETED',
    userId: '1',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '2',
    weekNumber: 2,
    dateRange: '8 - 12 January, 2024',
    status: 'COMPLETED',
    userId: '1',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: '3',
    weekNumber: 3,
    dateRange: '15 - 19 January, 2024',
    status: 'INCOMPLETE',
    userId: '1',
    createdAt: '2024-01-19T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z',
  },
  {
    id: '4',
    weekNumber: 4,
    dateRange: '22 - 26 January, 2024',
    status: 'COMPLETED',
    userId: '1',
    createdAt: '2024-01-26T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z',
  },
  {
    id: '5',
    weekNumber: 5,
    dateRange: '29 January - 1 February, 2024',
    status: 'MISSING',
    userId: '1',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
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

  // Filter timesheets for the authenticated user
  const userTimesheets = mockTimesheets.filter(t => t.userId === user.id);
  
  return NextResponse.json(userTimesheets);
}

export async function POST(request: NextRequest) {
  const token = getAuthToken(request);
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = getUserFromToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { weekNumber, dateRange } = body;

    const newTimesheet: Timesheet = {
      id: (mockTimesheets.length + 1).toString(),
      weekNumber,
      dateRange,
      status: 'INCOMPLETE',
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTimesheets.push(newTimesheet);

    return NextResponse.json(newTimesheet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}