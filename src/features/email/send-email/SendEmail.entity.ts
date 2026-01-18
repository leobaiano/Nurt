export type EmailTemplateVariables = Record<string, string | number>;

export interface SendEmailEntity {
  to: string;
  template: string;
  variables?: EmailTemplateVariables;
}
