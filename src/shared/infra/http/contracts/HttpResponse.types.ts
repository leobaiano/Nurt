/**
 * Success response (minimalist)
 */
export type SuccessResponse<T = unknown> = {
    data: T;
};

/**
 * Validation error field
 */
export type ValidationErrorField = {
    field: string;
    message: string;
};

/**
 * Error response (friendly messages)
 */
export type ErrorResponse = {
    error: {
        code: string;
        message: string;
        fields?: ValidationErrorField[];
    };
};

/**
 * Unified HTTP response type
 */
export type HttpResponse<T = unknown> =
    | SuccessResponse<T>
    | ErrorResponse;
