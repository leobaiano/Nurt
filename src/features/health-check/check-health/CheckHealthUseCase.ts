import { CheckHealthResult } from './CheckHealthResult';
import { getMongoDb } from '../../../config/mongo';
import { AppError } from '../../../shared/errors/AppError';

export class CheckHealthUseCase {
    async execute(): Promise<CheckHealthResult> {
        try {
            const db = getMongoDb();

            await db.command({ ping: 1 });

            return {
                status: 'ok',
                database: 'up',
            };
        } catch (error) {
            throw new AppError({
                code: 'DATABASE_UNAVAILABLE',
                publicMessage: 'Database is unavailable',
                category: 'INFRASTRUCTURE',
            });
        }
    }
}
