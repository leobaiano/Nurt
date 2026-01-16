import { Collection, ObjectId } from 'mongodb';
import { getMongoDb } from '../../../config/mongo';
import { SearchLeadRepository } from './SearchLeadsRepository';
import { SearchLeadDTO } from './SearchLeadsDTO';
import { SearchLead } from './SearchLeads.entity';

export class MongoSearchLeadRepository implements SearchLeadRepository {
  private readonly collection: Collection;

  constructor() {
    this.collection = getMongoDb().collection('leads');

    console.log("called mongo repository");
  }

  async search(filters: SearchLeadDTO): Promise<SearchLead[]> {
    const query: Record<string, unknown> = {};

    console.log(filters);
    console.log(filters.custom);

    if (filters.id) {
      query._id = new ObjectId(filters.id);
    }

    if (filters.email) {
      query.email = filters.email.toLowerCase();
    }

    if (filters.source) {
      query.source = {
        $regex: `^${filters.source}$`,
        $options: 'i',
      };
    }

        console.log('IF');
        Object.entries(filters).forEach(([key, value]) => {
            if (key.startsWith('custom.') && typeof value === 'string') {
              query[key] = {
                $regex: value,
                $options: 'i',
              };
            }
          });

    const docs = await this.collection.find(query).toArray();

    return docs.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      source: doc.source,
      custom: doc.custom,
    }));
  }
}
