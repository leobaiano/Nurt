import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { CreateLeadController } from '../../../../../src/features/leads/create-lead/CreateLeadController';
import { CreateLeadUseCase } from '../../../../../src/features/leads/create-lead/CreateLeadUseCase';
import { CreateLeadDTO } from '../../../../../src/features/leads/create-lead/CreateLeadDTO';
import { validCreateLeadInput } from './fixtures/CreateLeadInputFixture';

/**
 * Controller response types (recommended approach)
 */
type ValidationErrorResponse = {
  type: 'validation_error';
  code: string;
  message: string;
  fields: { property: string; message: string }[];
};

type SuccessResponse = {
  type: 'success';
  data: {
    message: string;
    email: string;
    leadId: string;
  };
};

type ControllerBody = ValidationErrorResponse | SuccessResponse;

describe('CreateLeadController', () => {
  let controller: CreateLeadController;
  let useCase: CreateLeadUseCase;
  let http: {
    handle: (fn: () => Promise<unknown>) => Promise<{
      statusCode: number;
      body: unknown;
    }>;
  };

  beforeEach(() => {
    http = {
      handle: vi.fn(async (fn) => ({
        statusCode: 200,
        body: await fn(),
      })),
    };

    useCase = {
      execute: vi.fn(),
    } as unknown as CreateLeadUseCase;

    controller = new CreateLeadController(http as any, useCase);
  });

  it('should return success response when input is valid', async () => {
    (useCase.execute as unknown as Mock).mockResolvedValue({
      email: validCreateLeadInput.email,
      leadId: 'lead-id-123',
    });

    const result = await controller.handle(validCreateLeadInput);

    const body = result.body as ControllerBody;

    expect(useCase.execute).toHaveBeenCalledWith(
      validCreateLeadInput as CreateLeadDTO
    );

    expect(body.type).toBe('success');
    expect(body).toEqual({
      type: 'success',
      data: {
        message: 'Registration completed successfully!',
        email: validCreateLeadInput.email,
        leadId: 'lead-id-123',
      },
    });
  });

  it('should return validation error when required fields are missing', async () => {
    const result = await controller.handle({});

    const body = result.body as ControllerBody;

    expect(useCase.execute).not.toHaveBeenCalled();

    expect(body.type).toBe('validation_error');
    expect(body).toEqual({
      type: 'validation_error',
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      fields: expect.arrayContaining([
        { property: 'name', message: 'Name is required' },
        { property: 'email', message: 'Email is required' },
        { property: 'phone', message: 'Phone is required' },
        {
          property: 'source',
          message: 'Source must be a non-empty array',
        },
      ]),
    });
  });

  it('should return validation error when source is empty', async () => {
    const result = await controller.handle({
      ...validCreateLeadInput,
      source: [],
    });

    const body = result.body as ControllerBody;

    expect(useCase.execute).not.toHaveBeenCalled();

    expect(body.type).toBe('validation_error');
    expect(body).toEqual(
      expect.objectContaining({
        fields: expect.arrayContaining([
          {
            property: 'source',
            message: 'Source must be a non-empty array',
          },
        ]),
      })
    );
  });

  it('should propagate use case errors through http controller', async () => {
    (useCase.execute as unknown as Mock).mockRejectedValue(
      new Error('Unexpected error')
    );

    await expect(
      controller.handle(validCreateLeadInput)
    ).rejects.toThrow('Unexpected error');
  });
});
