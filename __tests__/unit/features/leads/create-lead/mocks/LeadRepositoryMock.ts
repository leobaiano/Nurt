import { Lead } from '../../../../../../src/features/leads/create-lead/Lead.entity';
import { CreateLeadRepository } from '../../../../../../src/features/leads/create-lead/CreateLeadRepository';

export class LeadRepositoryMock implements CreateLeadRepository {
    private leads: Lead[] = [];

    async findByEmail(email: string): Promise<Lead | null> {
        const normalizedEmail = email.toLowerCase();

        const lead = this.leads.find(
            (l) => l.email.toLowerCase() === normalizedEmail
        );

        return lead ?? null;
    }

    async save(lead: Lead): Promise<void> {
        this.leads.push(lead);
    }

    async update(lead: Lead): Promise<void> {
        const index = this.leads.findIndex((l) => l.id.equals(lead.id));

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
