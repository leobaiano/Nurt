import { CreateLeadDTO } from '@/features/leads/create-lead/CreateLeadDTO';
import { CreateLeadRepository } from '@/features/leads/create-lead/CreateLeadRepository';
import { Lead } from '@/features/leads/create-lead/Lead.entity';
import { UniqueId } from '@/shared/domain/UniqueId';

export class CreateLeadUseCase {
    constructor(
        private readonly repository: CreateLeadRepository
    ) { }

    async execute(input: CreateLeadDTO) {
        const existingLead = await this.repository.findByEmail(input.email);

        if (existingLead) {
            existingLead.addSources(input.source);
            existingLead.custom = {
                ...existingLead.custom,
                ...input.custom,
            };
            existingLead.phone = input.phone;


            await this.repository.update(existingLead);

            return {
                email: existingLead.email,
                leadId: existingLead.id,
                phone: existingLead
            };
        }

        const lead = new Lead({
            id: new UniqueId(),
            name: input.name,
            email: input.email,
            phone: input.phone,
            source: input.source,
            custom: input.custom,
        });

        await this.repository.save(lead);

        return {
            email: lead.email,
            leadId: lead.id,
        };
    }
}
