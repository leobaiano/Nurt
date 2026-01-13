import { HttpController } from '../../../shared/infra/http/HttpController';
import { CreateLeadController } from './CreateLeadController';
import { CreateLeadUseCase } from './CreateLeadUseCase';
import { MongoCreateLeadRepository } from './MongoCreateLeadRepository';

export function createLeadFeature() {
  const http = new HttpController();
  const repository = new MongoCreateLeadRepository();
  const useCase = new CreateLeadUseCase(repository);

  return new CreateLeadController(http, useCase);
}
