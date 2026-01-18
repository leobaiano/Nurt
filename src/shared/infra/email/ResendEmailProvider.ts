import { Resend } from 'resend';
import { env } from '../../../config/env';

export interface SendEmailPayload {
  to: string;
  template: string;
  variables?: Record<string, string | number>;
}

export interface EmailProvider {
  send(payload: SendEmailPayload): Promise<void>;
}

export class ResendEmailProvider implements EmailProvider {
  private readonly client: Resend;

  constructor() {
    this.client = new Resend(env.resendApiKey);
  }

  async send({ to, template, variables }: SendEmailPayload): Promise<void> {
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
