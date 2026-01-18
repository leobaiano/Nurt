import { z } from 'zod';
import { HttpController } from '../../../shared/infra/http/HttpController';
import { SendEmailUseCase } from './SendEmailUseCase';
import { SendEmailDTO } from './SendEmailDTO';

const querySchema = z.object({
  to: z.string().email(),
  template: z.string().min(1),
});

export class SendEmailController {
  constructor(
    private readonly http: HttpController,
    private readonly useCase: SendEmailUseCase
  ) {}

  async handle(query: unknown, body: unknown) {
    return this.http.handle(async () => {
      const parsedQuery = querySchema.safeParse(query);

      if (!parsedQuery.success) {
        return {
          type: 'validation_error',
          code: 'INVALID_QUERY_PARAMS',
          message: 'Invalid query parameters',
          fields: parsedQuery.error.issues.map(issue => ({
            property: issue.path.join('.'),
            message: issue.message,
          })),
        };
      }

      const data: SendEmailDTO = {
        to: parsedQuery.data.to,
        template: parsedQuery.data.template,
        variables:
          typeof body === 'object' && body !== null ? body : undefined,
      };

      const result = await this.useCase.execute(data);

      return {
        type: 'success',
        data: result,
      };
    });
  }
}
