import { EmailProvider } from '../../domain/email/EmailProvider';
import { FakeEmailProvider } from './FakeEmailProvider';
import { ResendEmailProvider } from './ResendEmailProvider';
import { env } from '../../../config/env';

export function createEmailProvider(): EmailProvider {

  switch (env.emailProvider) {
    case 'resend':
      return new ResendEmailProvider();
    case 'fake':
    default:
      return new FakeEmailProvider();
  }

}
