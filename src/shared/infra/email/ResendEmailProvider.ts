import { Resend } from 'resend';
import { env } from '../../../config/env';
import { EmailProvider, SendEmailParams } from '../../domain/email/EmailProvider';
export class ResendEmailProvider implements EmailProvider {
  private readonly client: Resend;

  constructor() {
    this.client = new Resend(env.resendApiKey);
  }

  async send({ to, template, variables }: SendEmailParams): Promise<void> {
    const { error } = await this.client.emails.send({
      from: env.emailFrom,
      to,
      template: {
        id: template,
        variables,
      },
    });

    if (error) {
      throw new Error(
        `Resend error: ${error.message ?? 'Unknown email provider error'}`
      );
    }
  }
}
