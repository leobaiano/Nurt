import { SearchLeadRepository } from './SearchLeadsRepository';
import { SearchLeadDTO } from './SearchLeadsDTO';

export class SearchLeadsUseCase {
  constructor(
    private readonly repository: SearchLeadRepository
  ) { }

  async execute(filters: SearchLeadDTO) {
    const leads = await this.repository.search(filters);

    if (leads.length === 0) {
      return null;
    }

    return leads;
  }
}
