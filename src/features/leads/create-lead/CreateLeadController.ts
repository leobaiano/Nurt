import { HttpController } from '../../../shared/infra/http/HttpController';
import { CreateLeadUseCase } from './CreateLeadUseCase';
import { CreateLeadDTO } from './CreateLeadDTO';

export class CreateLeadController {
  constructor(
    private readonly http: HttpController,
    private readonly useCase: CreateLeadUseCase
  ) {}

  async handle(body: unknown) {
    return this.http.handle(async () => {
      const input = body as Partial<CreateLeadDTO>;
      const errors: { property: string; message: string }[] = [];

      if (!input.name) {
        errors.push({ property: 'name', message: 'Name is required' });
      }

      if (!input.email) {
        errors.push({ property: 'email', message: 'Email is required' });
      }

      if (!input.phone) {
        errors.push({ property: 'phone', message: 'Phone is required' });
      }

      if (!Array.isArray(input.source) || input.source.length === 0) {
        errors.push({
          property: 'source',
          message: 'Source must be a non-empty array',
        });
      }

      if (errors.length > 0) {
        return {
          type: 'validation_error',
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          fields: errors,
        };
      }

      const result = await this.useCase.execute(input as CreateLeadDTO);

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
