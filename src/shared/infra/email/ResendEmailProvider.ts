import { Resend } from 'resend';
import { EmailProvider, SendEmailParams, SendEmailResult } from '../../../shared/domain/email/EmailProvider';
import { env } from '../../../config/env';

export class ResendEmailProvider implements EmailProvider {
    private client: Resend;

    constructor() {
        this.client = new Resend(env.resendApiKey);
    }

    async send(params: SendEmailParams): Promise<SendEmailResult> {
        const { to, template, variables } = params;

        const response = await this.client.emails.send({
            to,
            from: env.emailFrom,
            template_id: template,
            dynamic_template_data: variables,
        });

        if (!response.data?.id) {
            throw new Error('Failed to send email');
        }

        return {
            messageId: response.data.id,
        };
    }
}
