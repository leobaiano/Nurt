import { EmailProvider } from '../../../shared/domain/email/EmailProvider';
import { SendEmailDTO } from './SendEmailDTO';

export class SendEmailUseCase {
  constructor(
    private readonly emailProvider: EmailProvider
  ) {}

  async execute(data: SendEmailDTO) {
    return this.emailProvider.send({
      to: data.to,
      template: data.template,
      variables: data.variables,
    });
  }
}
