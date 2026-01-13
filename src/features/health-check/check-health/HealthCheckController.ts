import { CheckHealthUseCase } from './CheckHealthUseCase';

export class CheckHealthController {
    constructor(private readonly useCase: CheckHealthUseCase) {}

    async handle() {
        const result = await this.useCase.execute();

        return {
            type: 'success',
            data: result,
        } as const;
    }
}