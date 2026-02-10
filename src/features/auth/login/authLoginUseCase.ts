import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';
import { AppError } from '@/shared/errors/AppError';

export class AuthLoginUseCase {
  async execute(data: { clientId?: string; clientSecret?: string; grantType?: string }) {
    const signOptions: SignOptions = {
      subject: env.clientId,
      expiresIn: env.jwtExpiresIn as any,
    };

    // Validação obrigatória do padrão OAuth2 M2M
    if (data.grantType !== 'client_credentials') {
      throw new AppError({
        category: 'AUTHENTICATION',
        code: 'INVALID_GRANT',
        publicMessage: 'O grant_type deve ser client_credentials',
      });
    }

    const isValid =
      data.clientId === env.clientId &&
      data.clientSecret === env.clientSecret;

    if (!isValid) {
      throw new AppError({
        category: 'AUTHENTICATION',
        code: 'INVALID_CLIENT',
        publicMessage: 'Client ID ou Client Secret inválidos',
      });
    }

    const token = jwt.sign(
      { iss: 'nurt-api' },
      env.jwtSecret!,
      {
        subject: env.clientId,
        expiresIn: env.jwtExpiresIn as any,
      }
    );

    return {
      access_token: token,
      token_type: 'Bearer',
      expires_in: env.jwtExpiresIn
    };
  }
}
