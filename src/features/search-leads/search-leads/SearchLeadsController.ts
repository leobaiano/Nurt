import { HttpController } from '../../../shared/infra/http/HttpController';
import { SearchLeadsUseCase } from './SearchLeadsUseCase';
import { SearchLeadDTO } from './SearchLeadsDTO';

export class SearchLeadsController {
  constructor(
    private readonly http: HttpController,
    private readonly useCase: SearchLeadsUseCase
  ) {}

  async handle(query: unknown) {
    return this.http.handle(async () => {
      const filters = query as SearchLeadDTO;

      const result = await this.useCase.execute(filters);

      return {
        type: 'success',
        data: result,
      };
    });
  }
}
