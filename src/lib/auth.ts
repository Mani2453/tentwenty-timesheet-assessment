import jwt from 'jsonwebtoken';
import { User } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@gmail.com',
    name: 'John Doe',
  },
  {
    id: '2',
    email: 'user@gmail.com',
    name: 'Test User',
  },
];

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // In a real app, you'd verify against a database
  const user = mockUsers.find(u => u.email === email);
  
  // For demo purposes, any password works
  if (user) {
    return user;
  }
  
  return null;
}

export function generateToken(user: User): string {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch {
    return null;
  }
}

export function getUserFromToken(token: string): User | null {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  return mockUsers.find(u => u.id === decoded.userId) || null;
}