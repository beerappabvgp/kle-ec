// Error handling utility for consistent error messages across the app

export const ErrorTypes = {
    NETWORK: 'NETWORK',
    VALIDATION: 'VALIDATION',
    AUTHENTICATION: 'AUTHENTICATION',
    AUTHORIZATION: 'AUTHORIZATION',
    NOT_FOUND: 'NOT_FOUND',
    SERVER: 'SERVER',
    UNKNOWN: 'UNKNOWN'
};

export const ErrorMessages = {
    [ErrorTypes.NETWORK]: {
        title: 'Connection Error',
        message: 'Unable to connect to the server. Please check your internet connection and try again.'
    },
    [ErrorTypes.VALIDATION]: {
        title: 'Validation Error',
        message: 'Please check your input and try again.'
    },
    [ErrorTypes.AUTHENTICATION]: {
        title: 'Authentication Error',
        message: 'Please log in to continue.'
    },
    [ErrorTypes.AUTHORIZATION]: {
        title: 'Access Denied',
        message: 'You don\'t have permission to perform this action.'
    },
    [ErrorTypes.NOT_FOUND]: {
        title: 'Not Found',
        message: 'The requested resource was not found.'
    },
    [ErrorTypes.SERVER]: {
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again later.'
    },
    [ErrorTypes.UNKNOWN]: {
        title: 'Unexpected Error',
        message: 'An unexpected error occurred. Please try again.'
    }
};

// Parse error from different sources (axios, fetch, etc.)
export const parseError = (error) => {
    console.error('Error details:', error);

    // Handle axios errors
    if (error.response) {
        const { status, data } = error.response;

        // Handle different HTTP status codes
        switch (status) {
            case 400:
                return {
                    type: ErrorTypes.VALIDATION,
                    title: 'Invalid Request',
                    message: data?.message || data?.error || 'Please check your input and try again.',
                    details: data,
                    status
                };
            case 401:
                return {
                    type: ErrorTypes.AUTHENTICATION,
                    title: 'Authentication Required',
                    message: data?.message || 'Please log in to continue.',
                    details: data,
                    status
                };
            case 403:
                return {
                    type: ErrorTypes.AUTHORIZATION,
                    title: 'Access Denied',
                    message: data?.message || 'You don\'t have permission to perform this action.',
                    details: data,
                    status
                };
            case 404:
                return {
                    type: ErrorTypes.NOT_FOUND,
                    title: 'Not Found',
                    message: data?.message || 'The requested resource was not found.',
                    details: data,
                    status
                };
            case 422:
                return {
                    type: ErrorTypes.VALIDATION,
                    title: 'Validation Error',
                    message: data?.message || 'Please check your input and try again.',
                    details: data,
                    status
                };
            case 429:
                return {
                    type: ErrorTypes.SERVER,
                    title: 'Too Many Requests',
                    message: 'You\'ve made too many requests. Please wait a moment and try again.',
                    details: data,
                    status
                };
            case 500:
            case 502:
            case 503:
            case 504:
                return {
                    type: ErrorTypes.SERVER,
                    title: 'Server Error',
                    message: data?.message || 'Something went wrong on our end. Please try again later.',
                    details: data,
                    status
                };
            default:
                return {
                    type: ErrorTypes.UNKNOWN,
                    title: 'Request Failed',
                    message: data?.message || `Request failed with status ${status}`,
                    details: data,
                    status
                };
        }
    }

    // Handle network errors
    if (error.request) {
        return {
            type: ErrorTypes.NETWORK,
            title: 'Network Error',
            message: 'Unable to connect to the server. Please check your internet connection.',
            details: error.request
        };
    }

    // Handle other errors
    if (error.message) {
        // Check for specific error messages
        if (error.message.includes('Network Error') || error.message.includes('timeout')) {
            return {
                type: ErrorTypes.NETWORK,
                title: 'Connection Error',
                message: 'Unable to connect to the server. Please check your internet connection.',
                details: error
            };
        }

        if (error.message.includes('validation') || error.message.includes('Validation')) {
            return {
                type: ErrorTypes.VALIDATION,
                title: 'Validation Error',
                message: error.message,
                details: error
            };
        }

        return {
            type: ErrorTypes.UNKNOWN,
            title: 'Error',
            message: error.message,
            details: error
        };
    }

    // Fallback for unknown errors
    return {
        type: ErrorTypes.UNKNOWN,
        title: 'Unexpected Error',
        message: 'An unexpected error occurred. Please try again.',
        details: error
    };
};

// Format validation errors from backend
export const formatValidationErrors = (errors) => {
    if (!errors) return [];

    if (Array.isArray(errors)) {
        return errors;
    }

    if (typeof errors === 'object') {
        return Object.entries(errors).map(([field, message]) => ({
            field,
            message: Array.isArray(message) ? message[0] : message
        }));
    }

    return [{ message: errors }];
};

// Get user-friendly error message
export const getErrorMessage = (error) => {
    const parsedError = parseError(error);
    return {
        title: parsedError.title,
        message: parsedError.message,
        type: parsedError.type,
        details: parsedError.details
    };
};

// Check if error is retryable
export const isRetryableError = (error) => {
    const parsedError = parseError(error);
    return [
        ErrorTypes.NETWORK,
        ErrorTypes.SERVER
    ].includes(parsedError.type);
};

// Get retry delay based on error type
export const getRetryDelay = (error, attempt = 1) => {
    const parsedError = parseError(error);

    switch (parsedError.type) {
        case ErrorTypes.NETWORK:
            return Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff, max 10s
        case ErrorTypes.SERVER:
            return Math.min(2000 * Math.pow(2, attempt), 30000); // Longer delay for server errors
        default:
            return 0; // Don't retry other errors
    }
}; 