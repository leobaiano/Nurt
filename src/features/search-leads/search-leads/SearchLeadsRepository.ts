import { SearchLead } from './SearchLeads.entity';
import { SearchLeadDTO } from './SearchLeadsDTO';

export interface SearchLeadRepository {
  search(filters: SearchLeadDTO): Promise<SearchLead[]>;
}