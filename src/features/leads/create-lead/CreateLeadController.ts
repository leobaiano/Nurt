import { HttpController } from '../../../shared/infra/http/HttpController';
import { CreateLeadUseCase } from './CreateLeadUseCase';
import { createLeadSchema } from './CreateLeadSchema';

export class CreateLeadController {
  constructor(
    private readonly http: HttpController,
    private readonly useCase: CreateLeadUseCase
  ) {}

  async handle(body: unknown) {
    return this.http.handle(async () => {
      // 1. Validação estrutural e de formato rigorosa via Zod
      const parseResult = createLeadSchema.safeParse(body);

      if (!parseResult.success) {
        // Mapeia os erros do Zod para o seu contrato de resposta de validação
        const fields = parseResult.error.issues.map((issue) => ({
          property: issue.path.join('.'),
          message: issue.message,
        }));

        return {
          type: 'validation_error',
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          fields,
        };
      }

      // 2. parseResult.data é o DTO higienizado (trimmed, email em lowercase, etc.)
      const result = await this.useCase.execute(parseResult.data);

      return {
        type: 'success',
        data: {
          message: 'Registration completed successfully!',
          email: result.email,
          leadId: result.leadId,
        },
      };
    });
  }
}
