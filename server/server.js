/**
 * Women Safety Platform - Backend API Server
 * 
 * This Express.js server provides API endpoints for:
 * - Emergency alerts with SMS notifications
 * - Nearby safety locations (police, hospitals, women centers)
 * - Emergency contacts management
 * - Safety tips by category
 * - SOS event logging for analytics
 * 
 * @version 2.0.0
 * @author Shesphere Platform Team
 */

const express = require('express');
const cors = require('cors');

// Import routes
const apiRoutes = require('./routes/api');

// Import error handlers
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

// =====================================
// APP INITIALIZATION
// =====================================
const app = express();
const PORT = process.env.PORT || 3001;

// =====================================
// CORS CONFIGURATION
// =====================================
/**
 * CORS setup for cross-origin requests
 * Allows the frontend (running on different port) to access this API
 */

// Get allowed origins from environment variable or use defaults
const getAllowedOrigins = () => {
    const envOrigins = process.env.ALLOWED_ORIGINS;
    
    // Default origins for development
    const defaultOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174'
    ];
    
    // In production, use environment variable
    if (envOrigins) {
        return envOrigins.split(',').map(origin => origin.trim());
    }
    
    return defaultOrigins;
};

const corsOptions = {
    origin: getAllowedOrigins(),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400
};

app.use(cors(corsOptions));

// =====================================
// MIDDLEWARE SETUP
// =====================================
/**
 * JSON body parser - parses incoming JSON payloads
 * Limit set to 10kb for security
 */
app.use(express.json({ limit: '10kb' }));

/**
 * URL-encoded body parser - parses form data
 */
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/**
 * Request logging middleware
 * Logs all incoming requests with timestamp and method
 */
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// =====================================
// API ROUTES
// =====================================
/**
 * Mount all API routes under /api prefix
 * All endpoints will be accessible at /api/*
 */
app.use('/api', apiRoutes);

// =====================================
// ROOT ENDPOINT
// =====================================
/**
 * Welcome endpoint - provides API information
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Shesphere - Women Safety Platform API',
        version: '2.0.0',
        documentation: {
            endpoints: {
                'POST /api/emergency': 'Send emergency alerts to contacts',
                'GET /api/locations': 'Get nearby safety locations (police, hospitals, women centers)',
                'POST /api/user/contacts': 'Save emergency contacts for a user',
                'GET /api/tips': 'Get safety tips by category',
                'POST /api/sos': 'Log SOS events for analytics',
                'GET /api/sos/history/:userId': 'Get SOS event history for a user',
                'GET /api/health': 'Health check endpoint'
            },
            notes: [
                'All endpoints accept/return JSON',
                'Latitude/Longitude are in decimal degrees',
                'Phone numbers should include country code'
            ]
        },
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

// =====================================
// ERROR HANDLING
// =====================================
/**
 * 404 Not Found handler
 * Catches requests to undefined routes
 */
app.use(notFoundHandler);

/**
 * Global error handler
 * Catches all errors and sends appropriate response
 */
app.use(globalErrorHandler);

// =====================================
// SERVER STARTUP
// =====================================
/**
 * Start the Express server
 * Listens on configured port with startup message
 */
app.listen(PORT, () => {
    console.log('\n========================================');
    console.log('🛡️  SHESPHERE - WOMEN SAFETY PLATFORM API');
    console.log('========================================');
    console.log(`📍 Server running on: http://localhost:${PORT}`);
    console.log(`📍 API endpoints at:  http://localhost:${PORT}/api`);
    console.log('========================================');
    console.log('Available Endpoints:');
    console.log('  POST /api/emergency     - Send emergency alerts');
    console.log('  GET  /api/locations     - Get nearby safety locations');
    console.log('  POST /api/user/contacts - Save emergency contacts');
    console.log('  GET  /api/tips          - Get safety tips');
    console.log('  POST /api/sos           - Log SOS events');
    console.log('  GET  /api/health        - Health check');
    console.log('========================================\n');
});

// =====================================
// GRACEFUL SHUTDOWN
// =====================================
/**
 * Handle process termination signals
 * Ensures clean shutdown of the server
 */
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

module.exports = app;
