import { AuthStrategy } from '@/shared/domain/auth/authStrategy';
import { env } from '@/config/env';

export class ApiTokenStrategy implements AuthStrategy {
  async verify(headers: Record<string, any>): Promise<boolean> {
    const apiKey = headers['x-api-key'];
    return apiKey === env.apiToken;
  }
}
