import { CreateLeadDTO } from './CreateLeadDTO';
import { CreateLeadRepository } from './CreateLeadRepository';
import { Lead } from './Lead.entity';
import { UniqueId } from '../../../shared/domain/UniqueId';

export class CreateLeadUseCase {
    constructor(
        private readonly repository: CreateLeadRepository
    ) { }

    async execute(input: CreateLeadDTO) {
        const existingLead = await this.repository.findByEmail(input.email);

        if (existingLead) {
            existingLead.addSources(input.source);
            await this.repository.update(existingLead);

            return {
                email: existingLead.email,
                leadId: existingLead.id,
            };
        }

        const lead = new Lead({
            id: new UniqueId().toString(),
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
