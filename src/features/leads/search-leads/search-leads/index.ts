import { HttpController } from '../../../../shared/infra/http/HttpController';
import { SearchLeadsController } from './SearchLeadsController';
import { SearchLeadsUseCase } from './SearchLeadsUseCase';
import { MongoSearchLeadRepository } from './MongoSearchLeadsRepository';

export function searchLeadsFeature() {
  const http = new HttpController();
  const repository = new MongoSearchLeadRepository();
  const useCase = new SearchLeadsUseCase(repository);

  return new SearchLeadsController(http, useCase);
}