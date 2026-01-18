import { EmailProvider } from '../../../shared/domain/email/EmailProvider';
import { SendEmailEntity } from './SendEmail.entity';

export class SendEmailUseCase {
  constructor(
    private readonly emailProvider: EmailProvider
  ) {}

  async execute(data: SendEmailEntity) {
    return this.emailProvider.send({
      to: data.to,
      template: data.template,
      variables: data.variables,
    });
  }
}
