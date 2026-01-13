import { CheckHealthResult } from './CheckHealthResult';
import { getMongoDb } from '../../../config/mongo';
import { AppError } from '../../../shared/errors/AppError';

export class CheckHealthUseCase {
    async execute(): Promise<CheckHealthResult> {
        try {
            const db = getMongoDb();

            await db.command({ ping: 1 });

            const collection = db.collection('leads');
            const indexes = await collection.indexes();
            const uniqueEmailIndexExists = indexes.some(
                (idx) => idx.name === 'unique_email'
            );

            if (!uniqueEmailIndexExists) {
                return {
                    status: 'degraded',
                    database: 'up',
                    leadsEmailIndex: 'missing',
                };
            }
            return {
                status: 'ok',
                database: 'up',
                leadsEmailIndex: 'exists',
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
