import {
    EmailProvider,
    SendEmailParams,
} from '../../domain/email/EmailProvider';

export class FakeEmailProvider implements EmailProvider {
    async send(_: SendEmailParams): Promise<void> {
        return;
    }
}
