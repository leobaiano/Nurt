import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { AppError } from '@/shared/errors/AppError';

export class AuthLoginUseCase {
  async execute(credentials: { username?: string; password?: string }) {
    const isValid =
      credentials.username === env.adminUserName &&
      credentials.password === env.adminPassword;

    if (!isValid) {
      throw new AppError({
        category: 'AUTHENTICATION',
        code: 'INVALID_CREDENTIALS',
        publicMessage: 'Invalid username or password',
      });
    }

    const token = jwt.sign({ sub: env.adminUserName }, env.jwtSecret!, {
      expiresIn: env.jwtExpiresIn,
    });

    return { token };
  }
}
