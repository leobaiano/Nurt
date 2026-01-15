import { Lead } from '../../../../../../src/features/leads/create-lead/Lead.entity';
import { CreateLeadRepository } from '../../../../../../src/features/leads/create-lead/CreateLeadRepository';
import crypto from 'node:crypto';

export class LeadRepositoryMock implements CreateLeadRepository {
  private leads: Lead[] = [];

  async findByEmail(email: string): Promise<Lead | null> {
    const normalizedEmail = email.toLowerCase();

    return (
      this.leads.find(
        (l) => l.email.toLowerCase() === normalizedEmail
      ) ?? null
    );
  }

  async save(lead: Lead): Promise<void> {
    if (!lead.id) {
      lead.id = crypto.randomUUID();
    }
    this.leads.push(lead);
  }

  async update(lead: Lead): Promise<void> {
    const index = this.leads.findIndex((l) => l.id === lead.id);

    if (index >= 0) {
      this.leads[index] = lead;
    }
  }

  getAll(): Lead[] {
    return [...this.leads];
  }

  clear(): void {
    this.leads = [];
  }
}
