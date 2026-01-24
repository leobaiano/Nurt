import { SendEmailUseCase } from './SendEmailUseCase';
import { SendEmailController } from './SendEmailController';
import { HttpController } from '../../../shared/infra/http/HttpController';
import { createEmailProvider } from '../../../shared/infra/email/EmailProviderFactory';

const emailProvider = createEmailProvider();

const sendEmailUseCase = new SendEmailUseCase(emailProvider);
const httpController = new HttpController();
const sendEmailController = new SendEmailController(
  httpController,
  sendEmailUseCase
);

export { sendEmailController };
