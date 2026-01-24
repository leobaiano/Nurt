import { HttpController } from '../../../shared/infra/http/HttpController';
import { SendEmailUseCase } from './SendEmailUseCase';
import { SendEmailEntity } from './SendEmail.entity';

function parseTemplateVariables(
  input: unknown
): Record<string, string | number> | undefined {
  if (!input || typeof input !== 'object' || input === null) {
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

  async handle(_query: unknown, body: unknown) {
    return this.http.handle(async () => {
      // Tipagem do body esperado [NOVA LINHA]
      const payload = body as {
        to?: string;
        template?: string;
        variables?: unknown;
      };

      if (!payload.to || !payload.template) {
        return {
          type: 'validation_error',
          code: 'INVALID_REQUEST',
          message: 'to and template are required in the request body',
        };
      }

      const data: SendEmailEntity = {
        to: payload.to,
        template: payload.template,
        variables: parseTemplateVariables(payload.variables),
      };

      await this.useCase.execute(data);

      return {
        type: 'success',
        data: {
          message: 'Email sent successfully',
        },
      };
    });
  }
}
