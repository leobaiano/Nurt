import { SendEmailUseCase } from './SendEmailUseCase';
import { SendEmailController } from './SendEmailController';
import { HttpController } from '../../../shared/infra/http/HttpController';
import { FakeEmailProvider } from '../../../shared/infra/email/FakeEmailProvider';
import { ResendEmailProvider } from '../../../shared/infra/email/ResendEmailProvider';

const emailProvider =
  process.env.NODE_ENV === 'production'
    ? new ResendEmailProvider()
    : new FakeEmailProvider();

const sendEmailUseCase = new SendEmailUseCase(emailProvider);
const httpController = new HttpController();
const sendEmailController = new SendEmailController(
  httpController,
  sendEmailUseCase
);

export { sendEmailController };
