import jwt from 'jsonwebtoken';
import { AuthStrategy } from '@/shared/domain/auth/authStrategy';
import { env } from '@/config/env';

export class JwtStrategy implements AuthStrategy {
  async verify(headers: Record<string, any>): Promise<boolean> {
    const authHeader = headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) return false;

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, env.jwtSecret!);
      return true;
    } catch {
      return false;
    }
  }
}
