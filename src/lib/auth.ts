import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'usagihub-secret-key';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  name: string;
}

export function verifyAdminToken(request: NextRequest): AdminUser | null {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return null;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAdmin(request: NextRequest): AdminUser {
  const user = verifyAdminToken(request);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

export function requireSuperAdmin(request: NextRequest): AdminUser {
  const user = requireAdmin(request);
  
  if (user.role !== 'super_admin') {
    throw new Error('Insufficient permissions');
  }
  
  return user;
}