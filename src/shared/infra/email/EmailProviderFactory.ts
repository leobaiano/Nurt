import { EmailProvider } from '../../domain/email/EmailProvider';
import { ResendEmailProvider } from './ResendEmailProvider';

export function createEmailProvider(): EmailProvider {

  // TODO: change to switch (env.emailProvider)
  return new ResendEmailProvider();
}
