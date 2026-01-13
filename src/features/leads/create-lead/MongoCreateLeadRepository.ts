import { Collection } from 'mongodb';
import { CreateLeadRepository } from './CreateLeadRepository';
import { Lead } from './Lead.entity';
import { getMongoDb } from '../../../config/mongo';

export class MongoCreateLeadRepository implements CreateLeadRepository {
  private readonly collection: Collection;

  constructor() {
    this.collection = getMongoDb().collection('leads');
  }

  async findByEmail(email: string): Promise<Lead | null> {
    const doc = await this.collection.findOne({ email });

    if (!doc) {
      return null;
    }

    return new Lead({
      id: doc.id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      source: doc.source,
      custom: doc.custom,
    });
  }

  async save(lead: Lead): Promise<void> {
    await this.collection.insertOne({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      custom: lead.custom,
    });
  }

  async update(lead: Lead): Promise<void> {
    await this.collection.updateOne(
      { email: lead.email },
      {
        $set: {
          source: lead.source,
          custom: lead.custom,
        },
      }
    );
  }
}
