export interface SendEmailParams {
    to: string;
    template: string;
    variables?: Record<string, unknown>;
}

export interface SendEmailResult {
    messageId: string;
}

export interface EmailProvider {
    send(params: SendEmailParams): Promise<SendEmailResult>;
}
