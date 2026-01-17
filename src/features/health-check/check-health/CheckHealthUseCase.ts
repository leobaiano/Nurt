import { CheckHealthResult } from './CheckHealthResult';
import { getMongoDb } from '../../../config/mongo';
import { AppError } from '../../../shared/errors/AppError';

export class CheckHealthUseCase {
  async execute(): Promise<CheckHealthResult> {
    try {
      const db = getMongoDb();

      // Verifica conectividade
      await db.command({ ping: 1 });

      const collection = db.collection('leads');
      const indexes = await collection.indexes();

      const requiredIndexes = [
        'unique_email',
        'idx_source',
        'idx_custom_wildcard',
      ];

      const existingIndexNames = indexes.map((idx) => idx.name);

      const allIndexesExist = requiredIndexes.every((indexName) =>
        existingIndexNames.includes(indexName)
      );

      if (!allIndexesExist) {
        return {
          status: 'degraded',
          database: 'up',
          indexes: 'missing',
        };
      }

      return {
        status: 'ok',
        database: 'up',
        indexes: 'ok',
      };
    } catch (error) {
      throw new AppError({
        code: 'DATABASE_UNAVAILABLE',
        publicMessage: 'Database is unavailable',
        category: 'INFRASTRUCTURE',
        originalError: error,
      });
    }
  }
}
