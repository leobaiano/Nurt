import { describe, it, expect, beforeEach } from 'vitest';
import { CreateLeadUseCase } from '../../../../../src/features/leads/create-lead/CreateLeadUseCase';
import { LeadRepositoryMock } from './mocks/LeadRepositoryMock';
import { validCreateLeadInput } from './fixtures/CreateLeadInputFixture';

describe('CreateLeadUseCase', () => {
  let repository: LeadRepositoryMock;
  let useCase: CreateLeadUseCase;

  beforeEach(() => {
    repository = new LeadRepositoryMock();
    repository.clear(); // garante mock limpo
    useCase = new CreateLeadUseCase(repository);
  });

  it('should create a new lead when email does not exist', async () => {
    const result = await useCase.execute(validCreateLeadInput);

    const leads = repository.getAll();
    expect(leads).toHaveLength(1);

    const lead = leads[0];

    expect(lead.name).toBe(validCreateLeadInput.name);
    expect(lead.email).toBe(validCreateLeadInput.email);
    expect(lead.phone).toBe(validCreateLeadInput.phone);
    expect(lead.source).toEqual(validCreateLeadInput.source);
    expect(lead.custom).toEqual(validCreateLeadInput.custom);

    expect(result).toEqual({
      email: lead.email,
      leadId: lead.id,
    });
  });

  it('should update an existing lead when email already exists', async () => {
    await useCase.execute(validCreateLeadInput);

    await useCase.execute({
      ...validCreateLeadInput,
      source: ['facebook'],
    });

    const leads = repository.getAll();

    expect(leads).toHaveLength(1);
    expect(leads[0].source).toEqual(
      expect.arrayContaining(['google', 'instagram', 'facebook'])
    );
  });

  it('should not duplicate sources when updating an existing lead', async () => {
    await useCase.execute(validCreateLeadInput);

    await useCase.execute({
      ...validCreateLeadInput,
      source: ['google'],
    });

    const lead = repository.getAll()[0];

    expect(lead.source).toEqual(expect.arrayContaining(['google', 'instagram']));

    const uniqueSources = Array.from(new Set(lead.source));
    expect(lead.source).toHaveLength(uniqueSources.length);
  });

  it('should allow creating a lead without custom data', async () => {
    const inputWithoutCustom = {
      ...validCreateLeadInput,
      custom: undefined,
    };

    await useCase.execute(inputWithoutCustom);

    const lead = repository.getAll()[0];

    expect(lead.custom).toBeUndefined();
  });

  it('should update phone when lead already exists', async () => {
    await useCase.execute(validCreateLeadInput);

    const updatedInput = {
      ...validCreateLeadInput,
      phone: '+55 11 98888-7777',
    };

    await useCase.execute(updatedInput);

    const lead = repository.getAll()[0];

    expect(lead.phone).toBe(updatedInput.phone);
  });

  it('should merge custom data instead of replacing it', async () => {
    await useCase.execute(validCreateLeadInput);

    await useCase.execute({
      ...validCreateLeadInput,
      custom: {
        utm_campaign: 'black-friday',
      },
    });

    const lead = repository.getAll()[0];

    expect(lead.custom).toEqual({
      age: 30,
      gender: 'male',
      utm_campaign: 'black-friday',
    });
  });

  it('should keep existing custom data if input.custom is undefined', async () => {
    await useCase.execute(validCreateLeadInput);
  
    await useCase.execute({
      ...validCreateLeadInput,
      custom: undefined,
      source: ['facebook'],
    });
  
    const lead = repository.getAll()[0];
  
    expect(lead.custom).toEqual(validCreateLeadInput.custom);
  });
  
});
