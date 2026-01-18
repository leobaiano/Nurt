import { createEmailProvider } from '../../../shared/infra/email/EmailProviderFactory';
import { SendEmailUseCase } from './SendEmailUseCase';
import { SendEmailController } from './SendEmailController';

const emailProvider = createEmailProvider();
const useCase = new SendEmailUseCase(emailProvider);
const controller = new SendEmailController(useCase);

export { controller };
