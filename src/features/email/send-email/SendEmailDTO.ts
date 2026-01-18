export interface SendEmailDTO {
    to: string;
    template: string;
    variables?: Object;
}