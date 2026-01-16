import { SearchLeadRepository } from './SearchLeadsRepository';
import { SearchLeadDTO } from './SearchLeadsDTO';

export class SearchLeadsUseCase {
  constructor(
    private readonly repository: SearchLeadRepository
  ) {}

  async execute(filters: SearchLeadDTO) {
    return this.repository.search(filters);
  }
}
