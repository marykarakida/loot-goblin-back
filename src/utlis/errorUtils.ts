const ERRORS = {
    error_bad_request: 400,
    error_unauthorized: 401,
    error_forbidden: 403,
    error_not_found: 404,
    error_conflict: 409,
    error_wrong_schema: 422,
};

type ErrorType = keyof typeof ERRORS;

export interface AppError {
    type: ErrorType;
    message: string | string[];
}

export function isAppError(error: object): error is AppError {
    return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: ErrorType) {
    return ERRORS[type];
}

export function unauthorizedError(message?: string): AppError {
    return { type: 'error_unauthorized', message: message ?? '' };
}

export function forbiddenError(message?: string): AppError {
    return { type: 'error_unauthorized', message: message ?? '' };
}

export function notFoundError(message?: string): AppError {
    return { type: 'error_not_found', message: message ?? '' };
}

export function conflictError(message?: string): AppError {
    return { type: 'error_conflict', message: message ?? '' };
}

export function wrongSchemaError(message?: string): AppError {
    return { type: 'error_wrong_schema', message: message ?? '' };
}
