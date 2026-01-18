export type EmailTemplateVariables = Record<string, string | number>;

export interface SendEmailParams {
  to: string;
  template: string;
  variables?: EmailTemplateVariables;
}

export interface EmailProvider {
  send(params: SendEmailParams): Promise<void>;
}
