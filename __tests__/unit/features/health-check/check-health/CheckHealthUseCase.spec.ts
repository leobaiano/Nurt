import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { CheckHealthUseCase } from '../../../../../src/features/health-check/check-health/CheckHealthUseCase';
import { AppError } from '../../../../../src/shared/errors/AppError';
import { getMongoDb } from '../../../../../src/config/mongo';

vi.mock('../../../../../src/config/mongo', () => ({
  getMongoDb: vi.fn(),
}));

describe('CheckHealthUseCase', () => {
  let useCase: CheckHealthUseCase;

  const mockCollection = {
    indexes: vi.fn(),
  };

  const mockDb = {
    command: vi.fn(),
    collection: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useCase = new CheckHealthUseCase();

    mockDb.command.mockResolvedValue({ ok: 1 });
    mockDb.collection.mockReturnValue(mockCollection);

    (getMongoDb as unknown as Mock).mockReturnValue(mockDb);
  });

  it('should return degraded when database is up but required indexes are missing', async () => {
    mockCollection.indexes.mockResolvedValue([
      { name: '_id_' },
    ]);

    const result = await useCase.execute();

    expect(result).toEqual({
      status: 'degraded',
      database: 'up',
      indexes: 'missing',
    });
  });

  it('should throw AppError when database is unavailable', async () => {
    mockDb.command.mockRejectedValue(new Error('Mongo is down'));

    await expect(useCase.execute()).rejects.toBeInstanceOf(AppError);

    await expect(useCase.execute()).rejects.toMatchObject({
      code: 'DATABASE_UNAVAILABLE',
      category: 'INFRASTRUCTURE',
    });
  });
});
