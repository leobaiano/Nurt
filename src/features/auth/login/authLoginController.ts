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
        username: body.username,
        password: body.password,
      });

      return {
        type: 'success',
        data: result,
      };
    });
  }
}
