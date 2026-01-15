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
  
    it('should return status ok when database is up and email index exists', async () => {
      mockCollection.indexes.mockResolvedValue([
        { name: 'unique_email' },
      ]);
  
      const result = await useCase.execute();
  
      expect(result).toEqual({
        status: 'ok',
        database: 'up',
        leadsEmailIndex: 'exists',
      });
  
      expect(mockDb.command).toHaveBeenCalledWith({ ping: 1 });
      expect(mockDb.collection).toHaveBeenCalledWith('leads');
      expect(mockCollection.indexes).toHaveBeenCalled();
    });
  
    it('should return degraded when database is up but email index is missing', async () => {
      mockCollection.indexes.mockResolvedValue([
        { name: '_id_' },
      ]);
  
      const result = await useCase.execute();
  
      expect(result).toEqual({
        status: 'degraded',
        database: 'up',
        leadsEmailIndex: 'missing',
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