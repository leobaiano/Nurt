import {
    SuccessResponse,
    ErrorResponse,
    ValidationErrorField,
} from './contracts/HttpResponse.types';

export class HttpResponseBuilder {
    static success<T>(data: T): SuccessResponse<T> {
        return { data };
    }

    static error(
        code: string,
        message: string,
        fields?: ValidationErrorField[]
    ): ErrorResponse {
        return {
            error: {
                code,
                message,
                ...(fields ? { fields } : {}),
            },
        };
    }
}
