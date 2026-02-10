import { HttpController } from '@/shared/infra/http/HttpController';
import { AuthLoginUseCase } from './authLoginUseCase';

export class AuthLoginController {
  constructor(
    private readonly http: HttpController,
    private readonly useCase: AuthLoginUseCase
  ) {}

  async handle(body: any) {
    return this.http.handle(async () => {
      const result = await this.useCase.execute({
        clientId: body.client_id,
        clientSecret: body.client_secret,
        grantType: body.grant_type,
      });

      return {
        type: 'success',
        data: result,
      };
    });
  }
}
