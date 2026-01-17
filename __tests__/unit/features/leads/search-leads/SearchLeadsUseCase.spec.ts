import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchLeadsUseCase } from '../../../../../src/features/leads/search-leads/SearchLeadsUseCase';
import { SearchLeadRepository } from '../../../../../src/features/leads/search-leads/SearchLeadsRepository';
import { SearchLeadDTO } from '../../../../../src/features/leads/search-leads/SearchLeadsDTO';

describe('SearchLeadsUseCase', () => {
  let repository: SearchLeadRepository;
  let useCase: SearchLeadsUseCase;

  beforeEach(() => {
    repository = {
      search: vi.fn(),
    };

    useCase = new SearchLeadsUseCase(repository);
  });

  it('should return leads when repository finds results', async () => {
    const filters: SearchLeadDTO = {
      email: 'john@example.com',
    };

    const leads = [
      {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '11999999999',
        source: ['google'],
        custom: { origin: 'LP' },
      },
    ];

    (repository.search as any).mockResolvedValue(leads);

    const result = await useCase.execute(filters);

    expect(repository.search).toHaveBeenCalledWith(filters);
    expect(result).toEqual(leads);
  });

  it('should return null when repository returns empty array', async () => {
    const filters: SearchLeadDTO = {
      source: 'facebook',
    };

    (repository.search as any).mockResolvedValue([]);

    const result = await useCase.execute(filters);

    expect(repository.search).toHaveBeenCalledWith(filters);
    expect(result).toBeNull();
  });

  it('should forward filters correctly to repository', async () => {
    const filters: SearchLeadDTO = {
      email: 'test@test.com',
      source: 'instagram',
      'custom.origin': 'Indicação',
    };

    (repository.search as any).mockResolvedValue([
      { _id: '1' },
    ]);

    await useCase.execute(filters);

    expect(repository.search).toHaveBeenCalledTimes(1);
    expect(repository.search).toHaveBeenCalledWith(filters);
  });
});
