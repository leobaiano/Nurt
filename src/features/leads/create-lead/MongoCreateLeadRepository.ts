import { Collection, ObjectId } from 'mongodb';
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
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      source: doc.source,
      custom: doc.custom,
    });
  }

  async save(lead: Lead): Promise<void> {
    const result = await this.collection.insertOne({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      custom: lead.custom,
    });

    lead.id = result.insertedId.toString();
  }

  async update(lead: Lead): Promise<void> {
    if (!lead.id) {
      throw new Error('Cannot update lead without id');
    }

    await this.collection.updateOne(
      { _id: new ObjectId(lead.id) },
      {
        $set: {
          source: lead.source,
          custom: lead.custom,
          phone: lead.phone,
        },
      }
    );
  }
}
