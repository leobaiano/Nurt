import { env } from '@//config/env';
import { AuthStrategy } from '@/shared/domain/auth/authStrategy';
import { ApiTokenStrategy } from '@/shared/infra/auth/ApiTokenStrategy';
import { JwtStrategy } from '@/shared/infra/auth/JwtStrategy';

export function createAuthStrategy(): AuthStrategy {
  const strategies: Record<string, () => AuthStrategy> = {
    'api-token': () => new ApiTokenStrategy(),
    'jwt': () => new JwtStrategy(),
  };

  return strategies[env.authStrategy]();
}
