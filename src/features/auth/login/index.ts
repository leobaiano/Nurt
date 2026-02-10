import { AuthLoginUseCase } from './authLoginUseCase';
import { AuthLoginController } from './authLoginController';
import { HttpController } from '@/shared/infra/http/HttpController';

const authLoginUseCase = new AuthLoginUseCase();
const httpController = new HttpController();
const authLoginController = new AuthLoginController(httpController, authLoginUseCase);

export { authLoginController };
