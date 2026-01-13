export type AppErrorCategory =
    | 'INFRASTRUCTURE'
    | 'CONFIGURATION'
    | 'AUTHENTICATION'
    | 'AUTHORIZATION'
    | 'CONFLICT'
    | 'INTERNAL';

interface AppErrorParams {
    category: AppErrorCategory;
    code: string;
    publicMessage: string;
    internalMessage?: string;
    originalError?: unknown;
}

export class AppError extends Error {
    readonly category: AppErrorCategory;
    readonly code: string;
    readonly publicMessage: string;
    readonly originalError?: unknown;

    constructor(params: AppErrorParams) {
        super(params.internalMessage ?? params.publicMessage);

        this.category = params.category;
        this.code = params.code;
        this.publicMessage = params.publicMessage;
        this.originalError = params.originalError;

        this.name = 'AppError';
    }
}
