import { Lead } from './Lead.entity';

export interface CreateLeadRepository {
  findByEmail(email: string): Promise<Lead | null>;
  save(lead: Lead): Promise<void>;
  update(lead: Lead): Promise<void>;
}
