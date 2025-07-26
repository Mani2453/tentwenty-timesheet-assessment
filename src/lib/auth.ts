import { jwtVerify, SignJWT } from 'jose'
import { User } from './types';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

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

export async function generateToken(user: User): Promise<string> {
  const payload = { id: user.id, email: user.email };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as User;
  } catch {
    return null;
  }
}

export async function getUserFromToken(token: string):Promise<User | null> {
  const decoded = await verifyToken(token);
  if (!decoded) return null;
  
  return mockUsers.find(u => u.id === decoded.id) || null;
}