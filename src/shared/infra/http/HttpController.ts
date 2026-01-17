import { AppError } from '../../errors/AppError';
import { HttpResponseBuilder } from './HttpResponse';

type FeatureResult =
    | { type: 'success'; data: unknown }
    | { type: 'not_found' }
    | {
        type: 'validation_error';
        code: string;
        message: string;
        fields?: {
            property: string;
            message: string;
        }[];
    }
    | {
        type: 'business_error';
        code: string;
        message: string;
    };

export class HttpController {
    async handle(
        action: () => Promise<FeatureResult>
    ): Promise<{ statusCode: number; body: unknown }> {
        try {
            const result = await action();

            switch (result.type) {
                case 'success':
                    return {
                        statusCode: 200,
                        body: HttpResponseBuilder.success(result.data),
                    };
                case 'not_found':
                    return {
                        statusCode: 404,
                        body: undefined,
                    };

                case 'validation_error':
                    return {
                        statusCode: 400,
                        body: HttpResponseBuilder.error(
                            result.code,
                            result.message,
                            result.fields?.map((field) => ({
                                field: field.property,
                                message: field.message,
                            }))
                        ),
                    };

                case 'business_error':
                    return {
                        statusCode: 409,
                        body: HttpResponseBuilder.error(
                            result.code,
                            result.message
                        ),
                    };
            }
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(
        error: unknown
    ): { statusCode: number; body: unknown } {
        if (error instanceof AppError) {
            console.error('🔥 AppError:', {
                category: error.category,
                code: error.code,
                message: error.message,
                originalError: error.originalError,
            });

            return {
                statusCode: this.mapCategoryToStatus(error.category),
                body: HttpResponseBuilder.error(
                    error.code,
                    error.publicMessage
                ),
            };
        }

        console.error('💥 Unknown error:', error);

        return {
            statusCode: 500,
            body: HttpResponseBuilder.error(
                'INTERNAL_SERVER_ERROR',
                'An unexpected error occurred'
            ),
        };
    }

    private mapCategoryToStatus(category: AppError['category']): number {
        switch (category) {
            case 'AUTHENTICATION':
                return 401;
            case 'AUTHORIZATION':
                return 403;
            case 'CONFLICT':
                return 409;
            case 'CONFIGURATION':
            case 'INFRASTRUCTURE':
            case 'INTERNAL':
            default:
                return 500;
        }
    }
}
