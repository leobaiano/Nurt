import { CheckHealthController } from './HealthCheckController';
import { CheckHealthUseCase } from './CheckHealthUseCase';

export function makeHealthCheckController() {
    const useCase = new CheckHealthUseCase();
    return new CheckHealthController(useCase);
}
