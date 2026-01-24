import { EmailProvider } from '../../domain/email/EmailProvider';
import { FakeEmailProvider } from './FakeEmailProvider';
import { ResendEmailProvider } from './ResendEmailProvider';

export function createEmailProvider(): EmailProvider {

  // TODO: change to switch (env.emailProvider)
  return new FakeEmailProvider();
  // return new ResendEmailProvider();
}
