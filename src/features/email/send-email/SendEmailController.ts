import { HttpController } from '../../../shared/infra/http/HttpController';
import { SendEmailUseCase } from './SendEmailUseCase';
import { SendEmailEntity } from './SendEmail.entity';

function parseTemplateVariables(
  input: unknown
): Record<string, string | number> | undefined {
  if (!input || typeof input !== 'object') {
    return undefined;
  }

  const variables: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string' || typeof value === 'number') {
      variables[key] = value;
    }
  }

  return Object.keys(variables).length > 0 ? variables : undefined;
}

export class SendEmailController {
  constructor(
    private readonly http: HttpController,
    private readonly useCase: SendEmailUseCase
  ) { }

  async handle(query: unknown, body: unknown) {
    return this.http.handle(async () => {
      const parsedQuery = query as {
        to?: string;
        template?: string;
      };

      if (!parsedQuery.to || !parsedQuery.template) {
        return {
          type: 'validation_error',
          code: 'INVALID_REQUEST',
          message: 'to and template are required',
        };
      }

      const data: SendEmailEntity = {
        to: parsedQuery.to,
        template: parsedQuery.template,
        variables: parseTemplateVariables(body),
      };

      await this.useCase.execute(data);

      return {
        type: 'success',
        data: {
          message: 'Send email successfully',
        },
      };
    });
  }
}
