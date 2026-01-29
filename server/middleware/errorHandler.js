/**
 * Global Error Handling Middleware
 * Provides consistent error responses across all endpoints
 */

// =====================================
// CUSTOM ERROR CLASS
// =====================================
/**
 * Custom API Error class for structured error handling
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class APIError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// =====================================
// NOT FOUND HANDLER
// =====================================
/**
 * Middleware to handle 404 Not Found errors
 * Called when no route matches the request
 */
const notFoundHandler = (req, res, next) => {
    const error = new APIError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};

// =====================================
// GLOBAL ERROR HANDLER
// =====================================
/**
 * Global error handling middleware
 * Catches all errors and sends appropriate response
 */
const globalErrorHandler = (err, req, res, next) => {
    // Set default values
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error for debugging (in production, use a proper logger)
    console.error('ERROR:', {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Development vs Production error response
    if (process.env.NODE_ENV === 'development') {
        // Send detailed error in development
        res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        });
    } else {
        // Send minimal error in production
        if (err.isOperational) {
            // Operational error: send message to client
            res.status(err.statusCode).json({
                success: false,
                status: err.status,
                message: err.message
            });
        } else {
            // Programming error: don't leak details
            res.status(500).json({
                success: false,
                status: 'error',
                message: 'Something went wrong. Please try again later.'
            });
        }
    }
};

// =====================================
// ASYNC ERROR WRAPPER
// =====================================
/**
 * Wrapper to catch errors in async route handlers
 * Eliminates the need for try-catch blocks in every handler
 * @param {Function} fn - Async function to wrap
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = {
    APIError,
    notFoundHandler,
    globalErrorHandler,
    asyncHandler
};
